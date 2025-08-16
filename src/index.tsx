import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for all API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Enhanced Rate limiting for MASS operations (in-memory for demo - use KV in production)
const rateLimitMap = new Map()
const processLocks = new Map()

// Optimized rate limiting for mass operations
const RATE_LIMITS = {
  // Standard API calls
  products: { limit: 200, windowMs: 60000 },     // 200 req/min
  collections: { limit: 100, windowMs: 60000 },   // 100 req/min
  
  // Mass operations - OPTIMIZED for thousands of products
  bulkUpdate: { limit: 500, windowMs: 60000 },    // 500 req/min for bulk
  bulkVariants: { limit: 300, windowMs: 60000 },  // 300 req/min for variants
  analyzeVariants: { limit: 50, windowMs: 60000 }, // 50 req/min for analysis
  
  // Concurrent processing limits
  concurrent: {
    maxChunks: 10,      // Max 10 chunks in parallel
    chunkSize: 50,      // 50 products per chunk
    chunkDelay: 200     // 200ms delay between chunks
  }
}

function rateLimit(key: string, operationType?: string): boolean {
  const config = operationType ? RATE_LIMITS[operationType] || RATE_LIMITS.products : { limit: 100, windowMs: 60000 }
  const now = Date.now()
  const windowStart = now - config.windowMs
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, [])
  }
  
  const requests = rateLimitMap.get(key)
  const recentRequests = requests.filter((time: number) => time > windowStart)
  
  if (recentRequests.length >= config.limit) {
    return false
  }
  
  recentRequests.push(now)
  rateLimitMap.set(key, recentRequests)
  return true
}

// Mass processing helper - chunks array into smaller pieces
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

// Delay helper for rate limiting
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Enhanced retry logic with exponential backoff
async function retryOperation<T>(operation: () => Promise<T>, maxRetries: number = 3, baseDelay: number = 1000): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (attempt === maxRetries) {
        throw error
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delayTime = baseDelay * Math.pow(2, attempt - 1)
      console.log(`🔄 Retry ${attempt}/${maxRetries} in ${delayTime}ms...`)
      await delay(delayTime)
    }
  }
  throw new Error('Max retries exceeded')
}

// Shopify API helper functions
// Enhanced Shopify API helper with timeout and retry logic
async function shopifyRequest(shop: string, accessToken: string, endpoint: string, method: string = 'GET', body?: any, timeout: number = 30000) {
  const url = `https://${shop}.myshopify.com/admin/api/2024-01/${endpoint}`
  
  const headers: any = {
    'X-Shopify-Access-Token': accessToken,
    'Content-Type': 'application/json',
  }
  
  const options: any = {
    method,
    headers,
    signal: AbortSignal.timeout(timeout) // 30s timeout by default
  }
  
  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body)
  }

  return await retryOperation(async () => {
    const response = await fetch(url, options)
    
    // Handle rate limiting from Shopify
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || '2'
      const waitTime = parseInt(retryAfter) * 1000
      console.log(`⏳ Rate limited by Shopify, waiting ${waitTime}ms...`)
      await delay(waitTime)
      throw new Error('Rate limited, retrying...')
    }
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Shopify API error: ${response.status} - ${errorText}`)
    }
    
    const data = await response.json()
    return data
  }, 3, 1000)
}

// Helper function to extract next page URL from Link header (SAME AS YOUR PYTHON SCRIPT)
function getNextPageUrl(linkHeader: string): string {
  if (!linkHeader) {
    return ""
  }
  
  const links = linkHeader.split(',')
  for (const link of links) {
    if (link.includes('rel="next"')) {
      const urlMatch = link.split(';')[0].trim()
      if (urlMatch.startsWith('<') && urlMatch.endsWith('>')) {
        return urlMatch.slice(1, -1) // Remove < and >
      }
    }
  }
  
  return ""
}

async function getAllProducts(shop: string, accessToken: string, forceLimit?: number) {
  let allProducts: any[] = []
  let url = `https://${shop}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,options,images,image`
  
  console.log(`🚀 USANDO LÓGICA DO SEU SCRIPT PYTHON - LINK HEADER PAGINATION`)
  
  while (url) {
    console.log(`🔍 Fetching: ${url}`)
    
    try {
      // Make the request directly with full URL
      const options: any = {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        }
      }
      
      const response = await fetch(url, options)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Shopify API error: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      const products = data.products || []
      
      console.log(`📦 Received ${products.length} products... Total so far: ${allProducts.length + products.length}`)
      
      if (products.length === 0) {
        console.log('🛑 No products in response, ending pagination')
        break
      }
      
      // Add products to our collection
      allProducts = allProducts.concat(products)
      
      // Get next page URL from Link header (EXACTLY LIKE YOUR PYTHON SCRIPT)
      const linkHeader = response.headers.get('Link') || ''
      url = getNextPageUrl(linkHeader)
      
      if (url) {
        console.log(`➡️ Next page found: ${url}`)
      } else {
        console.log('✅ No more pages, pagination complete')
      }
      
    } catch (error) {
      console.error('❌ Error in pagination:', error)
      break
    }
  }
  
  console.log(`🎉 PAGINATION COMPLETE: ${allProducts.length} total products found`)
  return allProducts
}

// Get all collections using same Link header logic as products
async function getAllCollections(shop: string, accessToken: string) {
  let allCollections: any[] = []
  
  // Get both custom and smart collections
  const collectionTypes = [
    'custom_collections',
    'smart_collections'
  ]
  
  console.log(`🚀 BUSCANDO COLEÇÕES - MESMA LÓGICA DO PYTHON`)
  
  for (const collectionType of collectionTypes) {
    let url = `https://${shop}.myshopify.com/admin/api/2024-01/${collectionType}.json?limit=250`
    
    console.log(`🔍 Fetching ${collectionType}...`)
    
    while (url) {
      try {
        const options: any = {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          }
        }
        
        const response = await fetch(url, options)
        
        if (!response.ok) {
          console.log(`Error fetching ${collectionType}: ${response.status}`)
          break
        }
        
        const data = await response.json()
        const collections = data[collectionType] || []
        
        console.log(`📦 Found ${collections.length} ${collectionType}`)
        
        if (collections.length === 0) {
          break
        }
        
        allCollections = allCollections.concat(collections)
        
        // Get next page URL from Link header
        const linkHeader = response.headers.get('Link') || ''
        url = getNextPageUrl(linkHeader)
        
      } catch (error) {
        console.error(`Error fetching ${collectionType}:`, error)
        break
      }
    }
  }
  
  console.log(`🎉 TOTAL COLLECTIONS: ${allCollections.length}`)
  return allCollections
}

// Function to get ALL products for a specific collection using Link header pagination
async function getAllProductsFromCollection(shop: string, accessToken: string, collectionId: string) {
  let allProducts: any[] = []
  let url = `https://${shop}.myshopify.com/admin/api/2024-01/collections/${collectionId}/products.json?limit=250&fields=id`
  
  while (url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        }
      })
      
      if (!response.ok) {
        break
      }
      
      const data = await response.json()
      const products = data.products || []
      
      // Add products to our collection
      allProducts = allProducts.concat(products)
      
      // Get next page URL from Link header (SAME PYTHON LOGIC)
      const linkHeader = response.headers.get('Link') || ''
      url = getNextPageUrl(linkHeader)
      
    } catch (error) {
      console.log(`❌ Error in collection ${collectionId} pagination:`, error)
      break
    }
  }
  
  return allProducts
}

// Function to get products for each collection and create mapping using FULL pagination
async function getProductCollectionMapping(shop: string, accessToken: string, collections: any[]) {
  const productCollectionMap: { [productId: string]: string[] } = {}
  
  console.log(`🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...`)
  
  // Para cada coleção, buscar TODOS os seus produtos com paginação
  for (const collection of collections) {
    try {
      console.log(`🔍 Buscando produtos da coleção "${collection.title}"...`)
      
      // Usar paginação completa para esta coleção
      const products = await getAllProductsFromCollection(shop, accessToken, collection.id)
      
      // Para cada produto desta coleção, adicionar o ID da coleção
      products.forEach((product: any) => {
        if (!productCollectionMap[product.id]) {
          productCollectionMap[product.id] = []
        }
        productCollectionMap[product.id].push(collection.id.toString())
      })
      
      console.log(`✅ Coleção "${collection.title}": ${products.length} produtos (com paginação completa)`)
      
    } catch (error) {
      console.log(`❌ Erro na coleção ${collection.title}:`, error)
    }
  }
  
  console.log(`✅ Mapeamento completo: ${Object.keys(productCollectionMap).length} produtos mapeados`)
  return productCollectionMap
}

async function bulkUpdateProducts(shop: string, accessToken: string, products: any[], updates: any) {
  const results: any[] = []
  
  // Process products sequentially to respect rate limits
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    
    try {
      // Build update object
      const updateData: any = { id: product.id }
      
      // Apply updates based on provided data
      if (updates.title && updates.title !== product.title) {
        updateData.title = updates.title
      }
      
      if (updates.description !== undefined && updates.description !== product.body_html) {
        updateData.body_html = updates.description
      }
      
      if (updates.vendor && updates.vendor !== product.vendor) {
        updateData.vendor = updates.vendor
      }
      
      if (updates.productType && updates.productType !== product.product_type) {
        updateData.product_type = updates.productType
      }
      
      if (updates.tags !== undefined) {
        updateData.tags = updates.tags
      }
      
      if (updates.status && updates.status !== product.status) {
        updateData.status = updates.status
      }
      
      // Handle SEO updates
      if (updates.seoTitle || updates.seoDescription) {
        updateData.metafields_global_title_tag = updates.seoTitle || product.metafields_global_title_tag
        updateData.metafields_global_description_tag = updates.seoDescription || product.metafields_global_description_tag
      }
      
      // Handle pricing updates for variants
      if (updates.price || updates.comparePrice) {
        updateData.variants = product.variants.map((variant: any) => ({
          id: variant.id,
          price: updates.price || variant.price,
          compare_at_price: updates.comparePrice || variant.compare_at_price
        }))
      }
      
      // Handle inventory updates
      if (updates.inventory !== undefined) {
        updateData.variants = product.variants.map((variant: any) => ({
          id: variant.id,
          inventory_quantity: updates.inventory
        }))
      }
      
      const response = await shopifyRequest(shop, accessToken, `products/${product.id}.json`, 'PUT', {
        product: updateData
      })
      
      results.push({
        id: product.id,
        success: true,
        data: response.product
      })
      
      // Add small delay to respect rate limits
      if (i < products.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
    } catch (error) {
      results.push({
        id: product.id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
  
  return results
}

// OPTIMIZED Mass Processing Function\nasync function massProcessProducts(shop: string, accessToken: string, products: any[], updateFunction: (chunk: any[]) => Promise<any[]>) {\n  const { chunkSize, maxChunks, chunkDelay } = RATE_LIMITS.concurrent\n  const chunks = chunkArray(products, chunkSize)\n  const allResults: any[] = []\n  \n  let totalProcessed = 0\n  let totalSuccessful = 0\n  let totalFailed = 0\n  \n  console.log(`🚀 MASS PROCESSING: ${products.length} products in ${chunks.length} chunks`)\n  \n  for (let i = 0; i < chunks.length; i += maxChunks) {\n    const chunkBatch = chunks.slice(i, i + maxChunks)\n    const batchPromises = chunkBatch.map(async (chunk) => {\n      try {\n        const chunkResults = await updateFunction(chunk)\n        const successful = chunkResults.filter((r: any) => r.success).length\n        const failed = chunkResults.filter((r: any) => !r.success).length\n        return { results: chunkResults, successful, failed }\n      } catch (error) {\n        return {\n          results: chunk.map((item: any) => ({ id: item.id, success: false, error: 'Processing failed' })),\n          successful: 0,\n          failed: chunk.length\n        }\n      }\n    })\n    \n    const batchResults = await Promise.allSettled(batchPromises)\n    batchResults.forEach((result) => {\n      if (result.status === 'fulfilled') {\n        const { results, successful, failed } = result.value\n        allResults.push(...results)\n        totalSuccessful += successful\n        totalFailed += failed\n        totalProcessed += results.length\n      }\n    })\n    \n    if (i + maxChunks < chunks.length) {\n      await delay(chunkDelay)\n    }\n  }\n  \n  return { results: allResults, totalProcessed, totalSuccessful, totalFailed }\n}\n\n// API Routes

// Test connection
app.post('/api/test-connection', async (c) => {
  try {
    const { shop, accessToken } = await c.req.json()
    
    if (!shop || !accessToken) {
      return c.json({ error: 'Parâmetros obrigatórios: shop e accessToken' }, 400)
    }
    
    // Test with a simple shop info request
    const response = await shopifyRequest(shop, accessToken, 'shop.json')
    
    return c.json({ 
      success: true, 
      shop: response.shop.name,
      domain: response.shop.domain,
      plan: response.shop.plan_name
    })
  } catch (error) {
    return c.json({ 
      error: 'Falha na conexão: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 401)
  }
})

// Favicon route to avoid 500 errors
app.get('/favicon.ico', (c) => {
  return c.text('', 204) // No content
})

// Test route for variant values fix
app.get('/test-variant-fix', (c) => {
  return c.html(`<!DOCTYPE html>
<html>
<head>
    <title>Teste - Variant Values Fix</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8">
    <h1 class="text-2xl font-bold mb-4">🧪 Teste da Correção de Valores de Variantes</h1>
    
    <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-bold text-green-800 mb-2">✅ Correção Aplicada</h2>
        <p class="text-green-700">Quando o usuário tenta alterar apenas valores de variantes:</p>
        <ul class="list-disc ml-6 mt-2 text-green-700">
            <li><strong>ANTES:</strong> Modal fechava + mensagem vermelha de erro + voltava para página principal</li>
            <li><strong>AGORA:</strong> Modal permanece aberto + mensagem azul informativa dentro do modal + usuário pode tentar novamente</li>
        </ul>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-bold text-blue-800 mb-2">🔧 Mudanças Técnicas</h2>
        <ul class="list-disc ml-6 text-blue-700">
            <li>Função <code>applyVariantChanges()</code> não fecha mais o modal quando apenas valores são alterados</li>
            <li>Nova função <code>showVariantMessage()</code> exibe mensagens dentro do próprio modal</li>
            <li>Mensagem informativa em azul em vez de erro vermelho</li>
            <li>Usuário pode fechar a mensagem ou tentar outras alterações</li>
        </ul>
    </div>

    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-bold text-yellow-800 mb-2">🧪 Simulação da Correção</h2>
        <p class="text-yellow-700 mb-3">Clique no botão abaixo para simular o comportamento corrigido:</p>
        <button onclick="testVariantMessage()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Simular Alteração de Valores
        </button>
        <div id="test-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">Variantes e Opções (Simulação)</h3>
                    <button onclick="closeTestModal()" class="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <div class="mb-4 p-4 bg-gray-50 rounded">
                    <p>Simulando: Usuário alterou valores de variantes e clicou em "Aplicar Alterações"</p>
                </div>
                <div id="test-message-area"></div>
            </div>
        </div>
    </div>

    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h2 class="text-lg font-bold text-gray-800 mb-2">🚀 Como Testar no App Real</h2>
        <ol class="list-decimal ml-6 text-gray-700">
            <li>Conecte-se com suas credenciais Shopify</li>
            <li>Carregue produtos</li>
            <li>Clique em "Variantes e Opções"</li>
            <li>Carregue variantes existentes</li>
            <li>Vá para a aba "Valores e Preços"</li>
            <li>Marque algumas alterações de valores</li>
            <li>Clique em "Aplicar Alterações"</li>
            <li><strong>Resultado:</strong> Mensagem azul informativa, modal permanece aberto</li>
        </ol>
    </div>

    <div class="mt-6 flex gap-4">
        <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            🔗 Voltar ao Infinity Bulk Manager
        </a>
    </div>

    <script>
        function testVariantMessage() {
            document.getElementById('test-modal').classList.remove('hidden');
            document.getElementById('test-modal').classList.add('flex');
            
            // Simular a mensagem que apareceria
            setTimeout(() => {
                const messageArea = document.getElementById('test-message-area');
                messageArea.innerHTML = \`
                    <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
                        <div class="flex items-start">
                            <i class="fas fa-info-circle mt-0.5 mr-3"></i>
                            <div class="flex-1">ℹ️ A edição de valores de variantes será implementada em breve. Por enquanto, você pode alterar apenas os títulos das opções (ex: "SIZE" → "Tamanho").</div>
                            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>
                    </div>
                \`;
            }, 500);
        }
        
        function closeTestModal() {
            document.getElementById('test-modal').classList.add('hidden');
            document.getElementById('test-modal').classList.remove('flex');
            document.getElementById('test-message-area').innerHTML = '';
        }
    </script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</body>
</html>`)
})

// Get all products - ALWAYS loads ALL products using working pagination logic
app.post('/api/products', async (c) => {
  try {
    const { shop, accessToken } = await c.req.json()
    
    if (!shop || !accessToken) {
      return c.json({ error: 'Parâmetros obrigatórios: shop e accessToken' }, 400)
    }
    
    // Rate limiting - OPTIMIZED for mass operations
    if (!rateLimit(`products:${shop}`, 'products')) {
      return c.json({ error: 'Rate limit exceeded' }, 429)
    }
    
    // SEMPRE carrega TODOS os produtos usando a lógica de paginação que funciona
    console.log('Loading ALL products with working pagination logic')
    const allProducts = await getAllProducts(shop, accessToken)
    console.log(`✅ Successfully loaded ${allProducts.length} total products`)
    
    // Buscar coleções para o mapeamento
    console.log('🔍 Loading collections for product mapping...')
    const collections = await getAllCollections(shop, accessToken)
    console.log(`✅ Loaded ${collections.length} collections`)
    
    // Criar mapeamento produto → coleções
    const productCollectionMap = await getProductCollectionMapping(shop, accessToken, collections)
    
    // Adicionar collection_ids aos produtos
    const productsWithCollections = allProducts.map(product => ({
      ...product,
      collection_ids: productCollectionMap[product.id] || []
    }))
    
    // Log first product to verify structure
    if (productsWithCollections.length > 0) {
      console.log('✅ First product with collections:', {
        id: productsWithCollections[0].id,
        title: productsWithCollections[0].title,
        collection_ids: productsWithCollections[0].collection_ids
      })
    }
    
    return c.json({ 
      products: productsWithCollections,
      total: productsWithCollections.length
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro ao buscar produtos: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// Get collections using same pagination logic as products
app.post('/api/collections', async (c) => {
  try {
    const { shop, accessToken } = await c.req.json()
    
    if (!shop || !accessToken) {
      return c.json({ error: 'Parâmetros obrigatórios: shop e accessToken' }, 400)
    }
    
    // Rate limiting - OPTIMIZED
    if (!rateLimit(`collections:${shop}`, 'collections')) {
      return c.json({ error: 'Rate limit exceeded' }, 429)
    }
    
    const collections = await getAllCollections(shop, accessToken)
    
    return c.json({ collections })
  } catch (error) {
    return c.json({ 
      error: 'Erro ao buscar coleções: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// Bulk update products
app.post('/api/bulk-update', async (c) => {
  try {
    const { shop, accessToken, productIds, updates } = await c.req.json()
    
    if (!shop || !accessToken || !productIds || !updates) {
      return c.json({ error: 'Parâmetros obrigatórios: shop, accessToken, productIds, updates' }, 400)
    }
    
    // Rate limiting for bulk operations - MASSIVELY OPTIMIZED
    if (!rateLimit(`bulk:${shop}`, 'bulkUpdate')) {
      return c.json({ error: 'Rate limit exceeded for bulk operations' }, 429)
    }
    
    // Get full product data first
    const products: any[] = []
    for (const id of productIds) {
      try {
        const response = await shopifyRequest(shop, accessToken, `products/${id}.json`)
        products.push(response.product)
      } catch (error) {
        console.error(`Error fetching product ${id}:`, error)
      }
    }
    
    const results = await bulkUpdateProducts(shop, accessToken, products, updates)
    
    return c.json({ 
      results,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro na atualização em massa: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// Analyze existing variants
app.post('/api/analyze-variants', async (c) => {
  try {
    const { shop, accessToken, scope, selectedProductIds } = await c.req.json()
    
    if (!shop || !accessToken) {
      return c.json({ error: 'Parâmetros obrigatórios: shop e accessToken' }, 400)
    }
    
    // Validate scope parameters
    if (scope === 'selected' && (!selectedProductIds || selectedProductIds.length === 0)) {
      return c.json({ error: 'Para escopo "selected", selectedProductIds é obrigatório' }, 400)
    }
    
    // Rate limiting - OPTIMIZED for analysis
    if (!rateLimit(`analyze-variants:${shop}`, 'analyzeVariants')) {
      return c.json({ error: 'Rate limit exceeded for variant analysis' }, 429)
    }
    
    // Get products based on scope
    let productsToAnalyze = []
    if (scope === 'selected') {
      const allProducts = await getAllProducts(shop, accessToken, 250)
      productsToAnalyze = allProducts.filter(product => 
        selectedProductIds.includes(product.id.toString()) || selectedProductIds.includes(product.id)
      )
      console.log(`🎯 Analisando variantes de ${productsToAnalyze.length} produtos selecionados`)
    } else {
      productsToAnalyze = await getAllProducts(shop, accessToken, 250)
      console.log(`🌐 Analisando variantes de todos os ${productsToAnalyze.length} produtos`)
    }
    
    // Analyze all variants
    const variantAnalysis: any = {}
    const optionStats: any = {}
    
    productsToAnalyze.forEach(product => {
      if (product.options && product.options.length > 0) {
        product.options.forEach((option: any) => {
          if (!optionStats[option.name]) {
            optionStats[option.name] = {
              name: option.name,
              values: new Set(),
              productCount: 0,
              products: []
            }
          }
          
          optionStats[option.name].productCount++
          optionStats[option.name].products.push({
            id: product.id,
            title: product.title
          })
          
          if (option.values) {
            option.values.forEach((value: string) => {
              optionStats[option.name].values.add(value)
            })
          }
        })
        
        // Analyze variants for pricing
        if (product.variants && product.variants.length > 0) {
          product.variants.forEach((variant: any) => {
            const key = `${product.id}_${variant.id}`
            variantAnalysis[key] = {
              productId: product.id,
              productTitle: product.title,
              variantId: variant.id,
              variantTitle: variant.title,
              price: variant.price,
              option1: variant.option1,
              option2: variant.option2,
              option3: variant.option3,
              sku: variant.sku
            }
          })
        }
      }
    })
    
    // Convert Sets to Arrays
    Object.keys(optionStats).forEach(key => {
      optionStats[key].values = Array.from(optionStats[key].values)
      optionStats[key].products = optionStats[key].products.slice(0, 10) // Limit for performance
    })
    
    return c.json({
      success: true,
      totalProducts: productsToAnalyze.length,
      optionStats: optionStats,
      variantCount: Object.keys(variantAnalysis).length,
      sampleVariants: Object.values(variantAnalysis).slice(0, 50) // Sample for performance
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro na análise de variantes: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// Bulk update variant titles
app.post('/api/bulk-update-variant-titles', async (c) => {
  try {
    const { shop, accessToken, titleMappings, scope, selectedProductIds } = await c.req.json()
    
    if (!shop || !accessToken || !titleMappings || titleMappings.length === 0) {
      return c.json({ error: 'Parâmetros obrigatórios: shop, accessToken, titleMappings' }, 400)
    }
    
    // Validate scope parameters
    if (scope === 'selected' && (!selectedProductIds || selectedProductIds.length === 0)) {
      return c.json({ error: 'Para escopo "selected", selectedProductIds é obrigatório' }, 400)
    }
    
    // Rate limiting for bulk variants - MASSIVELY OPTIMIZED
    if (!rateLimit(`bulk-variants:${shop}`, 'bulkVariants')) {
      return c.json({ error: 'Rate limit exceeded for bulk variant operations' }, 429)
    }
    
    // Get products based on scope
    let productsToProcess = []
    if (scope === 'all') {
      productsToProcess = await getAllProducts(shop, accessToken, 250)
    } else {
      // Get only selected products
      const allProducts = await getAllProducts(shop, accessToken, 250)
      productsToProcess = allProducts.filter(product => 
        selectedProductIds.includes(product.id.toString()) || selectedProductIds.includes(product.id)
      )
    }
    
    let updatedCount = 0
    let failedCount = 0
    const results: any[] = []
    
    console.log(`🎯 Processando ${productsToProcess.length} produtos (escopo: ${scope})`)
    
    // Process each product
    for (const product of productsToProcess) {
      try {
        let hasChanges = false
        const updatedOptions = product.options?.map((option: any) => {
          const mapping = titleMappings.find((m: any) => 
            m.currentTitle.toLowerCase() === option.name.toLowerCase()
          )
          
          if (mapping && mapping.newTitle && mapping.newTitle !== option.name) {
            hasChanges = true
            return {
              ...option,
              name: mapping.newTitle
            }
          }
          
          return option
        }) || []
        
        // Only update if there are changes
        if (hasChanges && updatedOptions.length > 0) {
          const response = await shopifyRequest(shop, accessToken, `products/${product.id}.json`, 'PUT', {
            product: {
              id: product.id,
              options: updatedOptions
            }
          })
          
          updatedCount++
          results.push({
            productId: product.id,
            title: product.title,
            success: true,
            changes: updatedOptions.map(opt => opt.name).join(', ')
          })
          
          // Add delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      } catch (error) {
        failedCount++
        results.push({
          productId: product.id,
          title: product.title,
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        })
      }
    }
    
    return c.json({ 
      success: true,
      totalProducts: productsToProcess.length,
      updatedCount,
      failedCount,
      results: results.slice(0, 50) // Limit results for performance
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro na atualização em massa de títulos de variantes: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// Bulk update variant values
app.post('/api/bulk-update-variant-values', async (c) => {
  try {
    const { shop, accessToken, valueMappings, scope, selectedProductIds } = await c.req.json()
    
    if (!shop || !accessToken || !valueMappings || valueMappings.length === 0) {
      return c.json({ error: 'Parâmetros obrigatórios: shop, accessToken, valueMappings' }, 400)
    }
    
    // Validate scope parameters
    if (scope === 'selected' && (!selectedProductIds || selectedProductIds.length === 0)) {
      return c.json({ error: 'Para escopo "selected", selectedProductIds é obrigatório' }, 400)
    }
    
    // Rate limiting for bulk variant values - MASSIVELY OPTIMIZED
    if (!rateLimit(`bulk-variant-values:${shop}`, 'bulkVariants')) {
      return c.json({ error: 'Rate limit exceeded for bulk variant value operations' }, 429)
    }
    
    // Get products based on scope
    let productsToProcess = []
    if (scope === 'all') {
      productsToProcess = await getAllProducts(shop, accessToken, 250)
    } else {
      // Get only selected products
      const allProducts = await getAllProducts(shop, accessToken, 250)
      productsToProcess = allProducts.filter(product => 
        selectedProductIds.includes(product.id.toString()) || selectedProductIds.includes(product.id)
      )
    }
    
    let updatedCount = 0
    let failedCount = 0
    const results: any[] = []
    
    console.log(`🎯 Processando valores de variantes em ${productsToProcess.length} produtos (escopo: ${scope})`)
    
    // Process each product
    for (const product of productsToProcess) {
      try {
        let hasChanges = false
        const updatedVariants = []
        
        // Process each variant
        if (product.variants && product.variants.length > 0) {
          for (const variant of product.variants) {
            let variantChanged = false
            const updatedOptions = []
            
            // Check each option value in this variant and calculate price extras
            let totalPriceExtra = 0
            if (variant.option1 || variant.option2 || variant.option3) {
              const optionValues = [variant.option1, variant.option2, variant.option3].filter(Boolean)
              const optionNames = product.options?.map((opt: any) => opt.name) || []
              
              for (let i = 0; i < optionValues.length; i++) {
                const currentValue = optionValues[i]
                const optionName = optionNames[i]
                
                // Find matching value mapping
                const mapping = valueMappings.find((m: any) => 
                  m.optionName === optionName && 
                  m.currentValue.toLowerCase() === currentValue.toLowerCase()
                )
                
                if (mapping) {
                  // Check if value should be changed
                  if (mapping.newValue && mapping.newValue !== currentValue) {
                    // Update the variant option value
                    if (i === 0) variant.option1 = mapping.newValue
                    else if (i === 1) variant.option2 = mapping.newValue  
                    else if (i === 2) variant.option3 = mapping.newValue
                    
                    variantChanged = true
                    hasChanges = true
                    
                    console.log(`🔄 ${product.title}: ${optionName} "${currentValue}" → "${mapping.newValue}"`)
                  }
                  
                  // Add price extra if specified
                  if (mapping.priceExtra && mapping.priceExtra > 0) {
                    totalPriceExtra += mapping.priceExtra
                    variantChanged = true
                    hasChanges = true
                    
                    console.log(`💰 ${product.title}: Preço extra +R$ ${mapping.priceExtra} para ${optionName}="${mapping.newValue || currentValue}"`)
                  }
                }
              }
            }
            
            // Update variant if changed
            if (variantChanged) {
              try {
                const updateData: any = {
                  id: variant.id,
                  option1: variant.option1,
                  option2: variant.option2 || null,
                  option3: variant.option3 || null
                }
                
                // Apply price extra if any
                if (totalPriceExtra > 0) {
                  const currentPrice = parseFloat(variant.price) || 0
                  const newPrice = (currentPrice + totalPriceExtra).toFixed(2)
                  updateData.price = newPrice
                  
                  console.log(`💰 ${product.title}: Preço atualizado de R$ ${variant.price} para R$ ${newPrice} (+R$ ${totalPriceExtra.toFixed(2)})`)
                }
                
                const updateResponse = await shopifyRequest(
                  shop, 
                  accessToken, 
                  `products/${product.id}/variants/${variant.id}.json`, 
                  'PUT',
                  { variant: updateData }
                )
                
                updatedVariants.push(variant)
                
              } catch (variantError) {
                console.error(`❌ Erro ao atualizar variante ${variant.id}:`, variantError)
                failedCount++
              }
            }
          }
        }
        
        if (hasChanges && updatedVariants.length > 0) {
          updatedCount++
          results.push({
            success: true,
            productId: product.id,
            title: product.title,
            changes: `${updatedVariants.length} variantes atualizadas`
          })
          
          console.log(`✅ ${product.title}: ${updatedVariants.length} variantes atualizadas`)
        }
        
      } catch (error) {
        failedCount++
        results.push({
          success: false,
          productId: product.id,
          title: product.title,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        })
        
        console.error(`❌ Erro ao processar produto ${product.id}:`, error)
      }
    }
    
    console.log(`🎉 VALORES DE VARIANTES ATUALIZADOS: ${updatedCount} produtos, ${failedCount} falhas`)
    
    return c.json({ 
      success: true,
      totalProducts: productsToProcess.length,
      updatedCount,
      failedCount,
      results: results.slice(0, 50) // Limit results for performance
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro na atualização em massa de valores de variantes: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// Main page with complete interface
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Infinity Bulk Manager - Gerenciamento em Massa de Produtos Shopify</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            .checkbox-row:hover { background-color: #f3f4f6; }
            .checkbox-large { transform: scale(1.2); }
            .product-row { cursor: pointer; transition: all 0.2s; }
            .product-row.selected { background-color: #dbeafe; }
            .loading-spinner { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        </style>
    </head>
    <body class="bg-gray-100 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="text-center py-8 mb-8">
                <div class="flex items-center justify-center mb-4">
                    <i class="fas fa-infinity text-green-600 text-4xl mr-3"></i>
                    <h1 class="text-4xl font-bold text-gray-800">Infinity Bulk Manager</h1>
                </div>
                <div class="text-gray-600 text-lg max-w-2xl mx-auto">
                    <p class="mb-2">Gerencie produtos da sua loja Shopify em massa com poder infinito.</p>
                    <p>Atualize preços, edite variantes e títulos de opções em milhares de produtos.</p>
                </div>
                <div id="connection-status" class="mt-4 hidden">
                    <span class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                        <i class="fas fa-check-circle mr-2"></i>
                        Conectado
                    </span>
                </div>
            </div>

            <!-- Connection Form -->
            <div id="connection-form" class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-plug mr-2"></i>
                    Conectar à sua loja Shopify
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Loja (sem .myshopify.com)</label>
                        <input type="text" id="shop-name" placeholder="exemplo: minhaloja" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
                        <input type="password" id="access-token" placeholder="shpat_..."
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                </div>
                <button id="connect-btn" class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <i class="fas fa-plug mr-2"></i>
                    Conectar
                </button>
                <div id="connection-error" class="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 hidden"></div>
            </div>

            <!-- Main Interface (hidden until connected) -->
            <div id="main-interface" class="hidden">
                <!-- Main Controls -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <button id="load-products-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            <i class="fas fa-sync-alt mr-2"></i>
                            Carregar Todos os Produtos
                        </button>
                        <button id="select-all-btn" class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            <i class="fas fa-check-square mr-1"></i>
                            Selecionar Todos
                        </button>
                        <button id="clear-selection-btn" class="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                            <i class="fas fa-square mr-1"></i>
                            Limpar Seleção
                        </button>
                        <button id="bulk-edit-btn" class="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled>
                            <i class="fas fa-edit mr-1"></i>
                            Edição em Massa
                        </button>
                        <button id="variant-titles-btn" class="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                            <i class="fas fa-cogs mr-1"></i>
                            Variantes e Opções
                        </button>
                    </div>
                    <div id="selection-info" class="text-sm text-gray-600"></div>
                </div>

                <!-- Products Table -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-lg font-bold text-gray-800">
                            <i class="fas fa-boxes mr-2"></i>
                            Todos os Produtos
                        </h3>
                        <div id="products-count" class="text-sm text-gray-600 mt-1"></div>
                    </div>
                    <div id="loading" class="p-8 text-center hidden">
                        <i class="fas fa-spinner loading-spinner text-blue-600 text-2xl"></i>
                        <p class="text-gray-600 mt-2">Carregando produtos...</p>
                    </div>
                    <div id="products-container" class="max-h-96 overflow-y-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input type="checkbox" id="select-all-checkbox" class="checkbox-large">
                                    </th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variantes</th>
                                </tr>
                            </thead>
                            <tbody id="products-list" class="divide-y divide-gray-200">
                                <!-- Products will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Filtro de Coleções - POSICIONADO EMBAIXO COMO COMBINADO -->
                    <div id="collections-filter-section" class="border-t border-gray-200 p-4 bg-gray-50 hidden">
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-filter text-gray-600"></i>
                                <label class="text-sm font-medium text-gray-700">Filtrar por coleção:</label>
                                <select id="collection-filter" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm min-w-64">
                                    <option value="">📦 Todas as coleções</option>
                                </select>
                            </div>
                            <div id="filter-info" class="text-xs text-gray-600"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bulk Edit Modal -->
            <div id="bulk-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-edit mr-2"></i>
                            Edição em Massa
                        </h3>
                        <button id="close-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="bulk-edit-form" class="space-y-6">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Basic Information -->
                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">Informações Básicas</h4>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-title" class="mr-2">
                                        <span class="font-medium text-gray-700">Título do Produto</span>
                                    </label>
                                    <input type="text" id="bulk-title" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-description" class="mr-2">
                                        <span class="font-medium text-gray-700">Descrição</span>
                                    </label>
                                    <textarea id="bulk-description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled></textarea>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-vendor" class="mr-2">
                                        <span class="font-medium text-gray-700">Fornecedor</span>
                                    </label>
                                    <input type="text" id="bulk-vendor" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-product-type" class="mr-2">
                                        <span class="font-medium text-gray-700">Tipo de Produto</span>
                                    </label>
                                    <input type="text" id="bulk-product-type" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-tags" class="mr-2">
                                        <span class="font-medium text-gray-700">Tags (separadas por vírgula)</span>
                                    </label>
                                    <input type="text" id="bulk-tags" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-status" class="mr-2">
                                        <span class="font-medium text-gray-700">Status</span>
                                    </label>
                                    <select id="bulk-status" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                        <option value="active">Ativo</option>
                                        <option value="draft">Rascunho</option>
                                        <option value="archived">Arquivado</option>
                                    </select>
                                </div>
                            </div>
                            
                            <!-- Pricing and Inventory -->
                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">Preços e Estoque</h4>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-price" class="mr-2">
                                        <span class="font-medium text-gray-700">Preço</span>
                                    </label>
                                    <input type="number" id="bulk-price" step="0.01" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-compare-price" class="mr-2">
                                        <span class="font-medium text-gray-700">Preço de Comparação</span>
                                    </label>
                                    <input type="number" id="bulk-compare-price" step="0.01" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-inventory" class="mr-2">
                                        <span class="font-medium text-gray-700">Quantidade em Estoque</span>
                                    </label>
                                    <input type="number" id="bulk-inventory" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-sku" class="mr-2">
                                        <span class="font-medium text-gray-700">SKU</span>
                                    </label>
                                    <input type="text" id="bulk-sku" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-weight" class="mr-2">
                                        <span class="font-medium text-gray-700">Peso (kg)</span>
                                    </label>
                                    <input type="number" id="bulk-weight" step="0.001" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-track-inventory" class="mr-2">
                                        <span class="font-medium text-gray-700">Rastrear Estoque</span>
                                    </label>
                                    <select id="bulk-track-inventory" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- SEO Section -->
                        <div class="border-t pt-6">
                            <h4 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">SEO</h4>
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-seo-title" class="mr-2">
                                        <span class="font-medium text-gray-700">Título SEO</span>
                                    </label>
                                    <input type="text" id="bulk-seo-title" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-seo-description" class="mr-2">
                                        <span class="font-medium text-gray-700">Descrição SEO</span>
                                    </label>
                                    <textarea id="bulk-seo-description" rows="3" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-4 border-t pt-6">
                            <button type="button" id="cancel-bulk" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" id="apply-bulk" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-save mr-2"></i>
                                Aplicar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Advanced Variant Management Modal -->
            <div id="variant-titles-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-cogs mr-2"></i>
                            Variantes e Opções - Gerenciamento Avançado
                        </h3>
                        <button id="close-variant-titles-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 class="font-bold text-blue-800 mb-2">
                                <i class="fas fa-edit mr-2"></i>Renomear Títulos de Opções
                            </h4>
                            <p class="text-blue-700 text-sm mb-3">
                                Altere os nomes das opções (ex: "Size" → "Tamanho") em todos os produtos.
                            </p>
                            
                            <!-- Seletor de Escopo para Carregamento -->
                            <div class="mb-4">
                                <h5 class="text-sm font-medium text-blue-800 mb-2">Carregar variantes de:</h5>
                                <div class="space-y-2">
                                    <label class="flex items-center text-sm">
                                        <input type="radio" name="load-scope" value="all" id="load-scope-all" class="mr-2" checked>
                                        <span>Todos os produtos da loja</span>
                                    </label>
                                    <label class="flex items-center text-sm">
                                        <input type="radio" name="load-scope" value="selected" id="load-scope-selected" class="mr-2">
                                        <span id="load-scope-selected-text">Apenas produtos selecionados (0 produtos)</span>
                                    </label>
                                </div>
                            </div>
                            
                            <button id="load-variant-data-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                                <i class="fas fa-search mr-2"></i>
                                Carregar Variantes Existentes
                            </button>
                        </div>
                        
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 class="font-bold text-green-800 mb-2">
                                <i class="fas fa-dollar-sign mr-2"></i>Editar Valores e Preços
                            </h4>
                            <p class="text-green-700 text-sm mb-3">
                                Altere valores das opções e adicione preços extras por variante.
                            </p>
                            <div class="text-xs text-green-600">
                                Disponível após carregar variantes existentes
                            </div>
                        </div>
                    </div>
                    
                    <div id="loading-variants" class="text-center py-8 hidden">
                        <i class="fas fa-spinner loading-spinner text-blue-600 text-2xl"></i>
                        <p class="text-gray-600 mt-2">Analisando variantes dos produtos...</p>
                    </div>
                    
                    <div id="variant-data-container" class="hidden">
                        <!-- Tab Navigation -->
                        <div class="flex border-b border-gray-200 mb-6">
                            <button id="tab-titles" class="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50">
                                <i class="fas fa-tags mr-2"></i>Títulos das Opções
                            </button>
                            <button id="tab-values" class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                <i class="fas fa-list mr-2"></i>Valores e Preços
                            </button>
                        </div>
                        
                        <!-- Titles Tab -->
                        <div id="content-titles" class="space-y-4">
                            <div id="existing-options-list" class="space-y-3">
                                <!-- Will be populated with existing options -->
                            </div>
                        </div>
                        
                        <!-- Values Tab -->
                        <div id="content-values" class="hidden space-y-4">
                            <div id="existing-values-list" class="space-y-4">
                                <!-- Will be populated with existing values and price options -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-6 mt-6">
                        <div class="flex justify-end space-x-4">
                            <button id="cancel-variant-titles" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button id="apply-variant-changes" class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors hidden">
                                <i class="fas fa-magic mr-2"></i>
                                Aplicar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Modal -->
            <div id="results-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-gray-800">
                            <i class="fas fa-chart-bar mr-2"></i>
                            Resultados da Atualização em Massa
                        </h3>
                        <button id="close-results-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div id="results-content">
                        <!-- Results will be shown here -->
                    </div>
                </div>
            </div>
        </div>


        <!-- Progress Modal -->
        <div id="progress-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-cogs mr-2"></i>
                        <span id="progress-title">Resultados da Atualização em Massa</span>
                    </h3>
                    <button id="close-progress-modal" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div id="progress-analyzed" class="text-2xl font-bold text-blue-600 mb-1">0</div>
                        <div class="text-sm text-blue-600 font-medium">Produtos Analisados</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div id="progress-updated" class="text-2xl font-bold text-green-600 mb-1">0</div>
                        <div class="text-sm text-green-600 font-medium">Produtos Atualizados</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div id="progress-failed" class="text-2xl font-bold text-red-600 mb-1">0</div>
                        <div class="text-sm text-red-600 font-medium">Falhas</div>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <div id="progress-unchanged" class="text-2xl font-bold text-yellow-600 mb-1">0</div>
                        <div class="text-sm text-yellow-600 font-medium">Sem Alteração</div>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">Progresso</span>
                        <span id="progress-text" class="text-sm text-gray-500">0/0</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div id="progress-bar" class="bg-green-500 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="text-sm font-medium text-gray-700 mb-2">Status Atual:</div>
                    <div id="progress-status" class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <i class="fas fa-clock mr-2"></i>Preparando processamento...
                    </div>
                </div>
                <div class="flex justify-end space-x-3">
                    <button id="cancel-progress" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                        Cancelar
                    </button>
                    <button id="hide-progress" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Ocultar (continua em background)
                    </button>
                </div>
            </div>
        </div>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
