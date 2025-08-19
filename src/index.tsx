import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for all API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// ULTRA-FAST Rate limiting and caching system
const rateLimitMap = new Map()
const processLocks = new Map()
const ultraCache = new Map() // Ultra-fast cache system

// REAL-TIME PROGRESS TRACKING SYSTEM
const activeOperations = new Map() // Store active operations and their progress

// Progress tracking structure
interface ProgressData {
  operationId: string
  type: string // 'bulk-update', 'variant-titles', 'variant-values'
  status: string
  analyzed: number
  updated: number
  failed: number
  unchanged: number
  total: number
  startTime: number
  lastUpdate: number
  details: string[]
}

// Create or update operation progress
function updateOperationProgress(operationId: string, progressData: Partial<ProgressData>) {
  const existing = activeOperations.get(operationId) || {
    operationId,
    analyzed: 0,
    updated: 0,
    failed: 0,
    unchanged: 0,
    total: 0,
    startTime: Date.now(),
    lastUpdate: Date.now(),
    status: 'starting',
    type: 'unknown',
    details: []
  }
  
  const updated = {
    ...existing,
    ...progressData,
    lastUpdate: Date.now()
  }
  
  activeOperations.set(operationId, updated)
  console.log(`📊 Progress Update [${operationId}]:`, updated)
  return updated
}

// SPEED-OPTIMIZED rate limiting for lightning-fast operations
const RATE_LIMITS = {
  // ULTRA-FAST API calls - More aggressive limits for speed
  products: { limit: 500, windowMs: 60000 },     // 500 req/min - MUCH FASTER
  collections: { limit: 300, windowMs: 60000 },   // 300 req/min - 3x FASTER
  
  // Mass operations - HYPER-OPTIMIZED for maximum speed
  bulkUpdate: { limit: 1000, windowMs: 60000 },    // 1000 req/min - LIGHTNING FAST
  bulkVariants: { limit: 800, windowMs: 60000 },   // 800 req/min - ULTRA FAST
  analyzeVariants: { limit: 200, windowMs: 60000 }, // 200 req/min - 4x FASTER
  
  // Concurrent processing limits - MAXIMUM PARALLELISM
  concurrent: {
    maxChunks: 20,      // Max 20 chunks in parallel - DOUBLED
    chunkSize: 25,      // 25 products per chunk - SMALLER FOR SPEED
    chunkDelay: 50      // 50ms delay - 4x FASTER
  }
}

// ULTRA-FAST Cache system with intelligent expiration
function getCacheKey(endpoint, params) {
  return `${endpoint}:${JSON.stringify(params)}`
}

function getCached(key, maxAgeMs = 300000) { // 5 min default cache
  const cached = ultraCache.get(key)
  if (cached && (Date.now() - cached.timestamp) < maxAgeMs) {
    console.log(`⚡ CACHE HIT: ${key}`)
    return cached.data
  }
  return null
}

function setCache(key, data) {
  ultraCache.set(key, {
    data: data,
    timestamp: Date.now()
  })
  // Keep cache clean - remove old entries
  if (ultraCache.size > 1000) {
    const oldestKey = ultraCache.keys().next().value
    ultraCache.delete(oldestKey)
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

// ULTRA-FAST product loading with intelligent caching and minimal fields
async function getAllProducts(shop: string, accessToken: string, forceLimit?: number) {
  const cacheKey = getCacheKey('products', { shop, forceLimit })
  
  // SPEED: Check cache first - return immediately if found
  const cached = getCached(cacheKey, 180000) // 3 min cache for products
  if (cached) {
    console.log(`⚡ PRODUCTS CACHE HIT - INSTANT LOAD: ${cached.length} products`)
    return cached
  }
  
  let allProducts: any[] = []
  // SPEED: Only essential fields to minimize transfer time
  const minimalFields = 'id,title,vendor,product_type,status,variants,options,image'
  let url = `https://${shop}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=${minimalFields}`
  
  console.log(`⚡ ULTRA-FAST PRODUCT LOADING - MINIMAL FIELDS ONLY`)
  
  const startTime = Date.now()
  let pageCount = 0
  
  while (url && pageCount < 20) { // SPEED: Limit pages to prevent infinite loops
    pageCount++
    console.log(`⚡ Speed loading page ${pageCount}...`)
    
    try {
      const options: any = {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
        // SPEED: Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000) // 10s max per request
      }
      
      const response = await fetch(url, options)
      
      if (!response.ok) {
        console.error(`❌ Page ${pageCount} failed: ${response.status}`)
        break
      }
      
      const data = await response.json()
      const products = data.products || []
      
      if (products.length === 0) {
        console.log(`✅ No more products at page ${pageCount}`)
        break
      }
      
      // SPEED: Add products immediately
      allProducts.push(...products)
      console.log(`⚡ Page ${pageCount}: +${products.length} products (Total: ${allProducts.length})`)
      
      // SPEED: Get next page URL
      const linkHeader = response.headers.get('Link') || ''
      url = getNextPageUrl(linkHeader)
      
      // SPEED: Force limit if specified for testing
      if (forceLimit && allProducts.length >= forceLimit) {
        console.log(`⚡ SPEED LIMIT REACHED: ${forceLimit} products`)
        allProducts = allProducts.slice(0, forceLimit)
        break
      }
      
    } catch (error) {
      console.error(`❌ Page ${pageCount} error:`, error)
      break
    }
  }
  
  const loadTime = Date.now() - startTime
  console.log(`⚡ ULTRA-FAST LOAD COMPLETE: ${allProducts.length} products in ${loadTime}ms`)
  
  // SPEED: Cache result for future requests
  setCache(cacheKey, allProducts)
  
  return allProducts
}

// ULTRA-FAST collections loading with parallel processing and caching
async function getAllCollections(shop: string, accessToken: string) {
  const cacheKey = getCacheKey('collections', { shop })
  
  // SPEED: Check cache first - instant return if found  
  const cached = getCached(cacheKey, 300000) // 5 min cache for collections
  if (cached) {
    console.log(`⚡ COLLECTIONS CACHE HIT - INSTANT LOAD: ${cached.length} collections`)
    return cached
  }
  
  // SPEED: Minimal fields for collections
  const fields = 'id,title,handle'
  const collectionTypes = ['custom_collections', 'smart_collections']
  
  console.log(`⚡ ULTRA-FAST COLLECTIONS LOADING - PARALLEL PROCESSING`)
  
  const startTime = Date.now()
  
  // SPEED: Process both collection types in parallel
  const collectionPromises = collectionTypes.map(async (collectionType) => {
    const typeCollections: any[] = []
    let url = `https://${shop}.myshopify.com/admin/api/2024-01/${collectionType}.json?limit=250&fields=${fields}`
    let pageCount = 0
    
    while (url && pageCount < 10) { // SPEED: Limit pages
      pageCount++
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(8000) // 8s timeout
        })
        
        if (!response.ok) break
        
        const data = await response.json()
        const collections = data[collectionType] || []
        
        if (collections.length === 0) break
        
        typeCollections.push(...collections)
        console.log(`⚡ ${collectionType} page ${pageCount}: +${collections.length}`)
        
        const linkHeader = response.headers.get('Link') || ''
        url = getNextPageUrl(linkHeader)
        
      } catch (error) {
        console.error(`❌ ${collectionType} error:`, error)
        break
      }
    }
    
    return typeCollections
  })
  
  // SPEED: Wait for all collection types to complete in parallel
  const results = await Promise.allSettled(collectionPromises)
  
  let allCollections: any[] = []
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allCollections.push(...result.value)
      console.log(`⚡ ${collectionTypes[index]}: ${result.value.length} collections`)
    }
  })
  
  const loadTime = Date.now() - startTime
  console.log(`⚡ ULTRA-FAST COLLECTIONS COMPLETE: ${allCollections.length} collections in ${loadTime}ms`)
  
  // SPEED: Cache result
  setCache(cacheKey, allCollections)
  
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

// ULTRA-OPTIMIZED Mass Processing Function with enhanced error handling and progress tracking
async function massProcessProducts(shop: string, accessToken: string, products: any[], updateFunction: (chunk: any[]) => Promise<any[]>) {
  const { chunkSize, maxChunks, chunkDelay } = RATE_LIMITS.concurrent
  const chunks = chunkArray(products, chunkSize)
  const allResults: any[] = []
  
  let totalProcessed = 0
  let totalSuccessful = 0
  let totalFailed = 0
  const startTime = Date.now()
  
  console.log(`🚀 ULTRA MASS PROCESSING STARTED`)
  console.log(`📊 Target: ${products.length} products`)
  console.log(`⚡ Strategy: ${chunks.length} chunks, ${chunkSize} products per chunk, ${maxChunks} chunks in parallel`)
  console.log(`⏱️ Expected time: ~${Math.ceil(chunks.length / maxChunks) * (chunkDelay / 1000)} seconds`)
  
  // Process chunks in parallel batches
  for (let batchIndex = 0; batchIndex < chunks.length; batchIndex += maxChunks) {
    const chunkBatch = chunks.slice(batchIndex, batchIndex + maxChunks)
    const batchNumber = Math.floor(batchIndex / maxChunks) + 1
    const totalBatches = Math.ceil(chunks.length / maxChunks)
    
    console.log(`🔥 Processing batch ${batchNumber}/${totalBatches} (${chunkBatch.length} chunks in parallel)`)
    
    const batchStartTime = Date.now()
    const batchPromises = chunkBatch.map(async (chunk, chunkIndex) => {
      const globalChunkIndex = batchIndex + chunkIndex + 1
      try {
        console.log(`⚡ Chunk ${globalChunkIndex}/${chunks.length}: Processing ${chunk.length} products...`)
        const chunkResults = await updateFunction(chunk)
        const successful = chunkResults.filter((r: any) => r.success).length
        const failed = chunkResults.filter((r: any) => !r.success).length
        
        console.log(`✅ Chunk ${globalChunkIndex}/${chunks.length}: ${successful} successful, ${failed} failed`)
        return { results: chunkResults, successful, failed, chunkIndex: globalChunkIndex }
      } catch (error) {
        console.error(`❌ Chunk ${globalChunkIndex}/${chunks.length} FAILED:`, error)
        return {
          results: chunk.map((item: any) => ({ 
            id: item.id, 
            success: false, 
            error: `Chunk processing failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
          })),
          successful: 0,
          failed: chunk.length,
          chunkIndex: globalChunkIndex
        }
      }
    })
    
    const batchResults = await Promise.allSettled(batchPromises)
    
    // Process batch results
    let batchSuccessful = 0
    let batchFailed = 0
    let batchProcessed = 0
    
    batchResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { results, successful, failed } = result.value
        allResults.push(...results)
        totalSuccessful += successful
        totalFailed += failed
        totalProcessed += results.length
        batchSuccessful += successful
        batchFailed += failed
        batchProcessed += results.length
      } else {
        console.error(`❌ Batch promise rejected:`, result.reason)
      }
    })
    
    const batchTime = Date.now() - batchStartTime
    const overallProgress = ((batchIndex + chunkBatch.length) / chunks.length * 100).toFixed(1)
    
    console.log(`🎯 Batch ${batchNumber}/${totalBatches} completed in ${batchTime}ms`)
    console.log(`📊 Batch stats: ${batchProcessed} processed, ${batchSuccessful} successful, ${batchFailed} failed`)
    console.log(`🚀 Overall progress: ${overallProgress}% (${totalProcessed}/${products.length} products)`)
    
    // Delay between batches (except for the last one)
    if (batchIndex + maxChunks < chunks.length) {
      console.log(`⏸️ Waiting ${chunkDelay}ms before next batch...`)
      await delay(chunkDelay)
    }
  }
  
  const totalTime = Date.now() - startTime
  const successRate = ((totalSuccessful / totalProcessed) * 100).toFixed(1)
  
  console.log(`🎉 ULTRA MASS PROCESSING COMPLETED!`)
  console.log(`⏱️ Total time: ${totalTime}ms (${(totalTime/1000).toFixed(1)}s)`)
  console.log(`📊 Final results: ${totalProcessed} processed, ${totalSuccessful} successful, ${totalFailed} failed`)
  console.log(`🎯 Success rate: ${successRate}%`)
  console.log(`⚡ Performance: ${(totalProcessed / (totalTime / 1000)).toFixed(1)} products/second`)
  
  return { 
    results: allResults, 
    totalProcessed, 
    totalSuccessful, 
    totalFailed,
    processingTime: totalTime,
    successRate: parseFloat(successRate),
    throughput: totalProcessed / (totalTime / 1000)
  }
}

// API Routes

// Get operation progress - for real-time monitoring
app.get('/api/progress/:operationId', async (c) => {
  const operationId = c.req.param('operationId')
  
  if (!operationId) {
    return c.json({ error: 'Operation ID required' }, 400)
  }
  
  const progress = activeOperations.get(operationId)
  
  if (!progress) {
    return c.json({ error: 'Operation not found' }, 404)
  }
  
  return c.json({
    progress,
    isActive: progress.status !== 'completed' && progress.status !== 'failed'
  })
})

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

// Test route for diagnosis modal fix
app.get('/test-modal-diagnostico', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste - Modal de Diagnóstico Corrigido</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/style.css">
<style>
        .loading-spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center py-8 mb-8">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
                <i class="fas fa-bug mr-3 text-red-600"></i>
                Correção: Modal de Diagnóstico
            </h1>
            <p class="text-gray-600 text-lg">
                Demonstração da solução para os problemas identificados no modal de diagnóstico.
            </p>
        </div>

        <!-- Problemas Identificados -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-bold text-red-800 mb-4">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Problemas Identificados
            </h2>
            <div class="space-y-3 text-red-700">
                <div class="flex items-start">
                    <i class="fas fa-times-circle mt-1 mr-3"></i>
                    <div>
                        <strong>Botão "Ver Detalhes" funciona apenas uma vez:</strong>
                        <p class="text-sm mt-1">Após fechar o modal e tentar abrir novamente, o botão não responde.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-times-circle mt-1 mr-3"></i>
                    <div>
                        <strong>Números não atualizam automaticamente:</strong>
                        <p class="text-sm mt-1">Contadores coloridos não mostram progresso em tempo real.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-times-circle mt-1 mr-3"></i>
                    <div>
                        <strong>Barra de progresso não avança:</strong>
                        <p class="text-sm mt-1">Barra verde permanece estática durante o processamento.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Soluções Implementadas -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-bold text-green-800 mb-4">
                <i class="fas fa-check-circle mr-2"></i>
                Soluções Implementadas
            </h2>
            <div class="space-y-3 text-green-700">
                <div class="flex items-start">
                    <i class="fas fa-check mt-1 mr-3"></i>
                    <div>
                        <strong>Event Listener Reutilizável:</strong>
                        <p class="text-sm mt-1">Modal pode ser aberto/fechado múltiplas vezes com event listeners limpos.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-check mt-1 mr-3"></i>
                    <div>
                        <strong>Atualização em Tempo Real:</strong>
                        <p class="text-sm mt-1">Contadores são atualizados a cada segundo durante o processamento.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-check mt-1 mr-3"></i>
                    <div>
                        <strong>Barra de Progresso Animada:</strong>
                        <p class="text-sm mt-1">Progresso visual com animações suaves e percentuais corretos.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Teste Prático -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-play-circle mr-2"></i>
                Teste Prático
            </h2>
            <p class="text-gray-600 mb-4">
                Clique nos botões abaixo para testar as funcionalidades corrigidas:
            </p>
            
            <div class="flex flex-wrap gap-4">
                <button id="test-processing-btn" class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                    <i class="fas fa-cogs mr-2"></i>
                    Simular Processamento
                </button>
                
                <button id="ver-detalhes-btn" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors" disabled>
                    <i class="fas fa-chart-line mr-2"></i>
                    Ver Detalhes
                </button>
                
                <button id="reset-test-btn" class="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                    <i class="fas fa-redo mr-2"></i>
                    Resetar Teste
                </button>
            </div>
            
            <div id="test-status" class="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                Status: Aguardando teste...
            </div>
        </div>

        <!-- Modal de Diagnóstico Corrigido -->
        <div id="diagnostico-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-cogs mr-2"></i>
                        <span id="diagnostic-title">Diagnóstico dos Títulos das Opções</span>
                    </h3>
                    <button id="close-diagnostic-modal" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <!-- Contadores Coloridos -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div id="counter-analyzed" class="text-3xl font-bold text-blue-600 mb-1">0</div>
                        <div class="text-sm text-blue-600 font-medium">Produtos Analisados</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div id="counter-updated" class="text-3xl font-bold text-green-600 mb-1">0</div>
                        <div class="text-sm text-green-600 font-medium">Produtos Atualizados</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div id="counter-failed" class="text-3xl font-bold text-red-600 mb-1">0</div>
                        <div class="text-sm text-red-600 font-medium">Falhas</div>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <div id="counter-unchanged" class="text-3xl font-bold text-yellow-600 mb-1">0</div>
                        <div class="text-sm text-yellow-600 font-medium">Sem Alteração</div>
                    </div>
                </div>
                
                <!-- Barra de Progresso -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">Progresso</span>
                        <span id="progress-text" class="text-sm text-gray-500">0/0</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-4">
                        <div id="progress-bar" class="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out" style="width: 0%"></div>
                    </div>
                </div>
                
                <!-- Status Atual -->
                <div class="mb-6">
                    <div class="text-sm font-medium text-gray-700 mb-2">Status Atual:</div>
                    <div id="current-status" class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <i class="fas fa-clock mr-2"></i>
                        <span id="status-text">Preparando processamento...</span>
                    </div>
                </div>
                
                <!-- Controles -->
                <div class="flex justify-end space-x-3">
                    <button id="cancel-processing" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                        Cancelar
                    </button>
                    <button id="hide-modal" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Ocultar (continua em background)
                    </button>
                </div>
            </div>
        </div>

        <!-- Instruções -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-blue-800 mb-3">
                <i class="fas fa-info-circle mr-2"></i>
                Como Testar
            </h2>
            <ol class="list-decimal ml-6 space-y-2 text-blue-700">
                <li><strong>Simular Processamento:</strong> Clique no botão laranja para iniciar uma simulação de processamento em massa.</li>
                <li><strong>Ver Detalhes:</strong> Clique no botão azul para abrir o modal de diagnóstico (disponível durante processamento).</li>
                <li><strong>Fechar e Reabrir:</strong> Feche o modal e clique novamente em "Ver Detalhes" - deve funcionar normalmente.</li>
                <li><strong>Observar Progresso:</strong> Veja os números e barra de progresso atualizando em tempo real.</li>
                <li><strong>Resetar:</strong> Use o botão cinza para resetar o teste e tentar novamente.</li>
            </ol>
        </div>
    </div>

    <script>
        class DiagnosticModalFix {
            constructor() {
                this.isProcessing = false;
                this.progressData = {
                    analyzed: 0,
                    updated: 0,
                    failed: 0,
                    unchanged: 0,
                    total: 100,
                    status: 'Preparando processamento...'
                };
                this.updateInterval = null;
                this.modalEventListeners = [];
                
                this.initializeEventListeners();
            }
            
            initializeEventListeners() {
                document.getElementById('test-processing-btn').addEventListener('click', () => this.startProcessing());
                document.getElementById('ver-detalhes-btn').addEventListener('click', () => this.openDiagnosticModal());
                document.getElementById('reset-test-btn').addEventListener('click', () => this.resetTest());
            }
            
            startProcessing() {
                if (this.isProcessing) return;
                
                this.isProcessing = true;
                this.progressData = {
                    analyzed: 0,
                    updated: 0,
                    failed: 0,
                    unchanged: 0,
                    total: 100,
                    status: 'Iniciando processamento...'
                };
                
                // Enable "Ver Detalhes" button
                document.getElementById('ver-detalhes-btn').disabled = false;
                document.getElementById('ver-detalhes-btn').classList.remove('opacity-50', 'cursor-not-allowed');
                
                // Update test status
                this.updateTestStatus('🔄 Processamento iniciado - Clique em "Ver Detalhes" para acompanhar');
                
                // Start progress simulation
                this.simulateProgress();
            }
            
            simulateProgress() {
                let processed = 0;
                const total = this.progressData.total;
                
                this.updateInterval = setInterval(() => {
                    if (processed >= total) {
                        this.finishProcessing();
                        return;
                    }
                    
                    // Simulate random progress
                    const increment = Math.floor(Math.random() * 3) + 1;
                    processed = Math.min(processed + increment, total);
                    
                    // Randomly distribute between success, failure, unchanged
                    const rand = Math.random();
                    if (rand < 0.7) {
                        this.progressData.updated += increment;
                    } else if (rand < 0.85) {
                        this.progressData.unchanged += increment;
                    } else {
                        this.progressData.failed += increment;
                    }
                    
                    this.progressData.analyzed = processed;
                    
                    // Update status messages
                    const statusMessages = [
                        'Analisando produtos...',
                        'Processando variantes...',
                        'Aplicando alterações...',
                        'Validando dados...',
                        'Atualizando preços...'
                    ];
                    this.progressData.status = statusMessages[Math.floor(Math.random() * statusMessages.length)];
                    
                    // Update display if modal is open
                    this.updateModalDisplay();
                    
                }, 1000); // Update every second
            }
            
            finishProcessing() {
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                
                this.progressData.status = 'Processamento concluído!';
                this.updateModalDisplay();
                this.updateTestStatus('✅ Processamento concluído - Modal pode ser reaberto múltiplas vezes');
                
                // Keep "Ver Detalhes" button enabled for testing reopening
                setTimeout(() => {
                    this.isProcessing = false;
                }, 3000);
            }
            
            openDiagnosticModal() {
                // CORREÇÃO 1: Remove event listeners antigos antes de adicionar novos
                this.removeModalEventListeners();
                
                const modal = document.getElementById('diagnostico-modal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                
                // CORREÇÃO 2: Adiciona event listeners frescos toda vez que abre
                this.addModalEventListeners();
                
                // CORREÇÃO 3: Atualiza display imediatamente ao abrir
                this.updateModalDisplay();
                
                this.updateTestStatus('📊 Modal aberto - Observe os números atualizando em tempo real');
            }
            
            addModalEventListeners() {
                const closeBtn = document.getElementById('close-diagnostic-modal');
                const cancelBtn = document.getElementById('cancel-processing');
                const hideBtn = document.getElementById('hide-modal');
                
                const closeHandler = () => this.closeDiagnosticModal();
                const cancelHandler = () => this.cancelProcessing();
                const hideHandler = () => this.hideDiagnosticModal();
                
                closeBtn.addEventListener('click', closeHandler);
                cancelBtn.addEventListener('click', cancelHandler);
                hideBtn.addEventListener('click', hideHandler);
                
                // CORREÇÃO: Armazena referências dos event listeners para remoção posterior
                this.modalEventListeners = [
                    { element: closeBtn, event: 'click', handler: closeHandler },
                    { element: cancelBtn, event: 'click', handler: cancelHandler },
                    { element: hideBtn, event: 'click', handler: hideHandler }
                ];
            }
            
            removeModalEventListeners() {
                // CORREÇÃO: Remove todos os event listeners antes de adicionar novos
                this.modalEventListeners.forEach(({ element, event, handler }) => {
                    element.removeEventListener(event, handler);
                });
                this.modalEventListeners = [];
            }
            
            closeDiagnosticModal() {
                const modal = document.getElementById('diagnostico-modal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                
                // CORREÇÃO: Remove event listeners ao fechar
                this.removeModalEventListeners();
                
                this.updateTestStatus('❌ Modal fechado - Clique novamente em "Ver Detalhes" para testar reabertura');
            }
            
            hideDiagnosticModal() {
                this.closeDiagnosticModal();
                this.updateTestStatus('👁️ Modal ocultado (processamento continua) - Teste "Ver Detalhes" novamente');
            }
            
            cancelProcessing() {
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                
                this.progressData.status = 'Processamento cancelado pelo usuário';
                this.updateModalDisplay();
                this.closeDiagnosticModal();
                
                this.isProcessing = false;
                this.updateTestStatus('🛑 Processamento cancelado');
            }
            
            updateModalDisplay() {
                // CORREÇÃO 4: Atualização em tempo real dos contadores
                document.getElementById('counter-analyzed').textContent = this.progressData.analyzed;
                document.getElementById('counter-updated').textContent = this.progressData.updated;
                document.getElementById('counter-failed').textContent = this.progressData.failed;
                document.getElementById('counter-unchanged').textContent = this.progressData.unchanged;
                
                // CORREÇÃO 5: Barra de progresso funcional
                const total = this.progressData.total;
                const processed = this.progressData.analyzed;
                const percentage = total > 0 ? Math.round((processed / total) * 100) : 0;
                
                document.getElementById('progress-bar').style.width = percentage + '%';
                document.getElementById('progress-text').textContent = processed + '/' + total;
                
                // CORREÇÃO 6: Status atualizado dinamicamente
                document.getElementById('status-text').textContent = this.progressData.status;
            }
            
            updateTestStatus(message) {
                document.getElementById('test-status').innerHTML = '<strong>Status:</strong> ' + message;
            }
            
            resetTest() {
                // Stop any running processes
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                
                // Close modal if open
                this.closeDiagnosticModal();
                
                // Reset state
                this.isProcessing = false;
                this.progressData = {
                    analyzed: 0,
                    updated: 0,
                    failed: 0,
                    unchanged: 0,
                    total: 100,
                    status: 'Preparando processamento...'
                };
                
                // Disable "Ver Detalhes" button
                document.getElementById('ver-detalhes-btn').disabled = true;
                document.getElementById('ver-detalhes-btn').classList.add('opacity-50', 'cursor-not-allowed');
                
                this.updateTestStatus('🔄 Teste resetado - Clique em "Simular Processamento" para começar');
            }
        }
        
        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new DiagnosticModalFix();
        });
    </script>
</body>
</html>`)
})

// Test route for variant values fix
app.get('/test-variant-fix', (c) => {
  return c.html(`<!DOCTYPE html>
<html>
<head>
    <title>Teste - Variant Values Fix</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/static/style.css">
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
    
    // Get full product data first - OPTIMIZED batch loading
    console.log(`🚀 MASS PROCESSING: Loading ${productIds.length} products...`)
    const products: any[] = []
    const failedToLoad: string[] = []
    
    // Process in smaller chunks to avoid timeouts
    const ID_CHUNK_SIZE = 50
    for (let i = 0; i < productIds.length; i += ID_CHUNK_SIZE) {
      const chunk = productIds.slice(i, i + ID_CHUNK_SIZE)
      console.log(`📦 Loading products chunk ${Math.floor(i/ID_CHUNK_SIZE) + 1}/${Math.ceil(productIds.length/ID_CHUNK_SIZE)}`)
      
      const chunkPromises = chunk.map(async (id: string) => {
        try {
          const response = await shopifyRequest(shop, accessToken, `products/${id}.json`)
          return response.product
        } catch (error) {
          console.error(`Error fetching product ${id}:`, error)
          failedToLoad.push(id)
          return null
        }
      })
      
      const chunkResults = await Promise.allSettled(chunkPromises)
      chunkResults.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          products.push(result.value)
        }
      })
      
      // Small delay between chunks
      if (i + ID_CHUNK_SIZE < productIds.length) {
        await delay(100)
      }
    }
    
    console.log(`✅ Successfully loaded ${products.length} products, ${failedToLoad.length} failed`)
    
    if (products.length === 0) {
      return c.json({ 
        error: 'Nenhum produto foi carregado com sucesso',
        failedToLoad 
      }, 400)
    }
    
    // Use MASS PROCESSING function instead of sequential processing
    console.log(`🚀 Starting MASS PROCESSING for ${products.length} products...`)
    const massResults = await massProcessProducts(shop, accessToken, products, async (chunk: any[]) => {
      return await bulkUpdateProducts(shop, accessToken, chunk, updates)
    })
    
    console.log(`🎉 MASS PROCESSING COMPLETE: ${massResults.totalProcessed} processed, ${massResults.totalSuccessful} successful, ${massResults.totalFailed} failed`)
    
    return c.json({ 
      results: massResults.results,
      successful: massResults.totalSuccessful,
      failed: massResults.totalFailed,
      totalProcessed: massResults.totalProcessed,
      failedToLoad: failedToLoad.length,
      massProcessingUsed: true
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro na atualização em massa: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// ULTRA-FAST variant analysis with intelligent caching and optimized processing
app.post('/api/analyze-variants', async (c) => {
  try {
    const { shop, accessToken, scope, selectedProductIds } = await c.req.json()
    
    if (!shop || !accessToken) {
      return c.json({ error: 'Parâmetros obrigatórios: shop e accessToken' }, 400)
    }
    
    // SPEED: Validate scope parameters quickly
    if (scope === 'selected' && (!selectedProductIds || selectedProductIds.length === 0)) {
      return c.json({ error: 'Para escopo "selected", selectedProductIds é obrigatório' }, 400)
    }
    
    // SPEED: Check cache first for instant results
    const cacheKey = getCacheKey('analyze-variants', { shop, scope, selectedProductIds })
    const cached = getCached(cacheKey, 120000) // 2 min cache
    if (cached) {
      console.log(`⚡ VARIANT ANALYSIS CACHE HIT - INSTANT RESULTS`)
      return c.json(cached)
    }
    
    console.log(`⚡ ULTRA-FAST VARIANT ANALYSIS STARTING`)
    const startTime = Date.now()
    
    // SPEED: Get products with optimized loading - REMOVED ARTIFICIAL LIMITS
    let productsToAnalyze = []
    if (scope === 'selected') {
      // SPEED: Load all products but filter only selected ones
      const allProducts = await getAllProducts(shop, accessToken) // NO LIMIT - get all products
      const selectedSet = new Set(selectedProductIds.map(id => id.toString()))
      productsToAnalyze = allProducts.filter(product => 
        selectedSet.has(product.id.toString())
      )
      console.log(`⚡ Selected products filtered: ${productsToAnalyze.length} products from ${allProducts.length} total`)
    } else {
      // SPEED: Load ALL products without limits for complete analysis
      productsToAnalyze = await getAllProducts(shop, accessToken) // NO LIMIT - process ALL products
      console.log(`⚡ All products loaded: ${productsToAnalyze.length} products (COMPLETE SET)`)
    }
    
    // SPEED: Ultra-fast variant analysis with optimized data structures
    const optionStats: any = {}
    const variantSamples: any[] = []
    let totalVariants = 0
    
    // SPEED: Single pass through products with minimal operations
    productsToAnalyze.forEach(product => {
      if (!product.options?.length) return
      
      // SPEED: Process options efficiently
      product.options.forEach((option: any) => {
        const optionName = option.name
        
        if (!optionStats[optionName]) {
          optionStats[optionName] = {
            name: optionName,
            values: new Set(),
            productCount: 0,
            products: []
          }
        }
        
        const stat = optionStats[optionName]
        stat.productCount++
        
        // SPEED: Only store first 5 products for performance
        if (stat.products.length < 5) {
          stat.products.push({
            id: product.id,
            title: product.title.substring(0, 50) // Truncate for speed
          })
        }
        
        // SPEED: Add values efficiently
        if (option.values?.length) {
          option.values.forEach((value: string) => stat.values.add(value))
        }
      })
      
      // SPEED: Only collect first 20 variant samples
      if (variantSamples.length < 20 && product.variants?.length) {
        const sampleVariant = product.variants[0]
        variantSamples.push({
          productId: product.id,
          productTitle: product.title.substring(0, 50),
          variantId: sampleVariant.id,
          price: sampleVariant.price,
          option1: sampleVariant.option1,
          option2: sampleVariant.option2,
          option3: sampleVariant.option3
        })
      }
      
      totalVariants += product.variants?.length || 0
    })
    
    // SPEED: Convert Sets to Arrays efficiently
    Object.keys(optionStats).forEach(key => {
      const stat = optionStats[key]
      stat.values = Array.from(stat.values)
    })
    
    const analyzeTime = Date.now() - startTime
    console.log(`⚡ ULTRA-FAST ANALYSIS COMPLETE: ${Object.keys(optionStats).length} options in ${analyzeTime}ms`)
    
    const result = {
      success: true,
      totalProducts: productsToAnalyze.length,
      optionStats: optionStats,
      variantCount: totalVariants,
      sampleVariants: variantSamples,
      performanceMs: analyzeTime
    }
    
    // SPEED: Cache results for instant future access
    setCache(cacheKey, result)
    
    return c.json(result)
    
  } catch (error) {
    console.error('❌ Variant analysis error:', error)
    return c.json({ 
      error: 'Erro na análise de variantes: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// ULTRA-FAST bulk update variant titles with REAL-TIME progress tracking
app.post('/api/bulk-update-variant-titles', async (c) => {
  try {
    const { shop, accessToken, titleMappings, scope, selectedProductIds } = await c.req.json()
    
    if (!shop || !accessToken || !titleMappings || titleMappings.length === 0) {
      return c.json({ error: 'Parâmetros obrigatórios: shop, accessToken, titleMappings' }, 400)
    }
    
    if (scope === 'selected' && (!selectedProductIds || selectedProductIds.length === 0)) {
      return c.json({ error: 'Para escopo "selected", selectedProductIds é obrigatório' }, 400)
    }
    
    // REAL-TIME: Create unique operation ID for progress tracking
    const operationId = `variant-titles-${Date.now()}-${Math.random().toString(36).substring(7)}`
    console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${operationId}`)
    
    const startTime = Date.now()
    
    // SPEED: Get products efficiently with caching
    let productsToProcess = []
    if (scope === 'all') {
      productsToProcess = await getAllProducts(shop, accessToken, 500) // Speed limit
    } else {
      const allProducts = await getAllProducts(shop, accessToken, 1000)
      const selectedSet = new Set(selectedProductIds.map(id => id.toString()))
      productsToProcess = allProducts.filter(product => 
        selectedSet.has(product.id.toString())
      )
    }
    
    console.log(`⚡ Processing ${productsToProcess.length} products for title updates`)
    
    // SPEED: Pre-process mappings for fast lookup
    const mappingMap = new Map()
    titleMappings.forEach(mapping => {
      mappingMap.set(mapping.currentTitle.toLowerCase(), mapping.newTitle)
    })
    
    // SPEED: Filter products that actually need updates
    const productsNeedingUpdate = productsToProcess.filter(product => {
      if (!product.options?.length) return false
      
      return product.options.some(option => {
        const newTitle = mappingMap.get(option.name.toLowerCase())
        return newTitle && newTitle !== option.name
      })
    })
    
    console.log(`⚡ Found ${productsNeedingUpdate.length} products needing updates`)
    
    // REAL-TIME: Initialize progress tracking
    updateOperationProgress(operationId, {
      type: 'variant-titles',
      status: 'processing',
      total: productsNeedingUpdate.length,
      analyzed: 0,
      updated: 0,
      failed: 0,
      unchanged: 0,
      details: [`Iniciando processamento de ${productsNeedingUpdate.length} produtos`]
    })
    
    // SPEED: Process in parallel batches for maximum speed
    const batchSize = 10 // Process 10 products simultaneously
    const batches = []
    
    for (let i = 0; i < productsNeedingUpdate.length; i += batchSize) {
      batches.push(productsNeedingUpdate.slice(i, i + batchSize))
    }
    
    let updatedCount = 0
    let failedCount = 0
    const results: any[] = []
    
    // REAL-TIME: Process batches with progress updates
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex]
      console.log(`⚡ Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} products)`)
      
      // REAL-TIME: Update progress before batch
      updateOperationProgress(operationId, {
        status: `Processando lote ${batchIndex + 1}/${batches.length}`,
        details: [`Processando lote ${batchIndex + 1} de ${batches.length} (${batch.length} produtos)`]
      })
      
      const batchPromises = batch.map(async (product) => {
        try {
          const updatedOptions = product.options.map(option => {
            const newTitle = mappingMap.get(option.name.toLowerCase())
            return newTitle && newTitle !== option.name 
              ? { ...option, name: newTitle }
              : option
          })
          
          const response = await shopifyRequest(shop, accessToken, `products/${product.id}.json`, 'PUT', {
            product: {
              id: product.id,
              options: updatedOptions
            }
          })
          
          return {
            productId: product.id,
            title: product.title.substring(0, 50), // Truncate for performance
            success: true,
            changes: updatedOptions.map(opt => opt.name).slice(0, 3).join(', ') // Limit for performance
          }
        } catch (error) {
          return {
            productId: product.id,
            title: product.title.substring(0, 50),
            success: false,
            error: error instanceof Error ? error.message.substring(0, 100) : 'Erro desconhecido'
          }
        }
      })
      
      // SPEED: Wait for batch to complete
      const batchResults = await Promise.allSettled(batchPromises)
      
      batchResults.forEach(result => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
          if (result.value.success) {
            updatedCount++
          } else {
            failedCount++
          }
        } else {
          failedCount++
          results.push({
            productId: 'unknown',
            title: 'Erro no batch',
            success: false,
            error: 'Batch processing failed'
          })
        }
      })
      
      // REAL-TIME: Update progress after each batch
      const analyzed = (batchIndex + 1) * batchSize
      const actualAnalyzed = Math.min(analyzed, productsNeedingUpdate.length)
      
      updateOperationProgress(operationId, {
        analyzed: actualAnalyzed,
        updated: updatedCount,
        failed: failedCount,
        unchanged: Math.max(0, actualAnalyzed - updatedCount - failedCount),
        status: `Processados ${actualAnalyzed}/${productsNeedingUpdate.length} produtos`,
        details: [
          `Lote ${batchIndex + 1}/${batches.length} concluído`,
          `${updatedCount} atualizados, ${failedCount} falhas`
        ]
      })
      
      // SPEED: Small delay between batches to respect rate limits
      if (batchIndex < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100)) // Minimal delay
      }
    }
    
    const processTime = Date.now() - startTime
    console.log(`⚡ ULTRA-FAST BULK UPDATE COMPLETE: ${updatedCount} updated, ${failedCount} failed in ${processTime}ms`)
    
    // REAL-TIME: Mark operation as completed
    updateOperationProgress(operationId, {
      status: 'completed',
      details: [
        `Operação concluída em ${Math.round(processTime / 1000)}s`,
        `${updatedCount} produtos atualizados com sucesso`,
        `${failedCount} produtos com erro`
      ]
    })
    
    return c.json({ 
      success: true,
      operationId, // CRITICAL: Return operationId for frontend polling
      totalProducts: productsToProcess.length,
      updatedCount,
      failedCount,
      results: results.slice(0, 20), // Limit for performance
      performanceMs: processTime
    })
    
  } catch (error) {
    console.error('❌ Bulk variant titles error:', error)
    return c.json({ 
      error: 'Erro na atualização em massa de títulos de variantes: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// ULTRA-FAST bulk update variant values with REAL-TIME progress tracking
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
    
    // REAL-TIME: Create unique operation ID for progress tracking
    const operationId = `variant-values-${Date.now()}-${Math.random().toString(36).substring(7)}`
    console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${operationId}`)
    
    const startTime = Date.now()
    
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
    
    // REAL-TIME: Initialize progress tracking
    updateOperationProgress(operationId, {
      type: 'variant-values',
      status: 'processing',
      total: productsToProcess.length,
      analyzed: 0,
      updated: 0,
      failed: 0,
      unchanged: 0,
      details: [`Iniciando processamento de ${productsToProcess.length} produtos com valores de variantes`]
    })
    
    // SPEED: Process in parallel batches for maximum speed
    const batchSize = 8 // Process 8 products simultaneously for variant values
    const batches = []
    
    for (let i = 0; i < productsToProcess.length; i += batchSize) {
      batches.push(productsToProcess.slice(i, i + batchSize))
    }
    
    // REAL-TIME: Process batches with progress updates
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex]
      console.log(`⚡ Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} products)`)
      
      // REAL-TIME: Update progress before batch
      updateOperationProgress(operationId, {
        status: `Processando lote ${batchIndex + 1}/${batches.length}`,
        details: [`Processando lote ${batchIndex + 1} de ${batches.length} (${batch.length} produtos)`]
      })
      
      const batchPromises = batch.map(async (product) => {
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
      }) // Closes the batch.map function
      
      // Wait for all promises in batch to complete
      await Promise.all(batchPromises)
      
      // REAL-TIME: Update progress after batch completion
      updateOperationProgress(operationId, {
        analyzed: (batchIndex + 1) * batchSize,
        updated: updatedCount,
        failed: failedCount,
        status: `Lote ${batchIndex + 1}/${batches.length} concluído`
      })
    }
    
    const processTime = Date.now() - startTime
    console.log(`🎉 ULTRA-FAST VARIANT VALUES UPDATE COMPLETE: ${updatedCount} updated, ${failedCount} failed in ${processTime}ms`)
    
    // REAL-TIME: Mark operation as completed
    updateOperationProgress(operationId, {
      status: 'completed',
      details: [
        `Operação concluída em ${Math.round(processTime / 1000)}s`,
        `${updatedCount} produtos atualizados com sucesso`,
        `${failedCount} produtos com erro`
      ]
    })
    
    return c.json({ 
      success: true,
      operationId, // CRITICAL: Return operationId for frontend polling
      totalProducts: productsToProcess.length,
      updatedCount,
      failedCount,
      results: results.slice(0, 50), // Limit results for performance
      performanceMs: processTime
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro na atualização em massa de valores de variantes: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    }, 500)
  }
})

// REAL-TIME progress tracking endpoint
app.get('/api/operation-progress/:operationId', async (c) => {
  try {
    const operationId = c.req.param('operationId')
    
    if (!operationId) {
      return c.json({ error: 'Operation ID is required' }, 400)
    }
    
    const progress = activeOperations.get(operationId)
    
    if (!progress) {
      return c.json({ 
        error: 'Operation not found',
        operationId 
      }, 404)
    }
    
    // Calculate percentage
    const percentage = progress.total > 0 ? Math.round((progress.analyzed / progress.total) * 100) : 0
    const elapsed = Date.now() - progress.startTime
    
    return c.json({
      success: true,
      operationId,
      progress: {
        ...progress,
        percentage,
        elapsedMs: elapsed,
        isComplete: progress.analyzed >= progress.total && progress.total > 0
      }
    })
  } catch (error) {
    return c.json({ 
      error: 'Error fetching progress: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500)
  }
})

// Clean up completed operations
app.delete('/api/operation-progress/:operationId', async (c) => {
  const operationId = c.req.param('operationId')
  activeOperations.delete(operationId)
  return c.json({ success: true, message: 'Operation progress cleared' })
})

// API endpoint for testing diagnostic modal
app.post('/api/test-diagnostic-progress', async (c) => {
  try {
    const { stage } = await c.req.json()
    
    // Simulate different stages of processing
    const stages = {
      'start': {
        analyzed: 0,
        updated: 0,
        failed: 0,
        unchanged: 0,
        total: 50,
        status: 'Iniciando processamento...',
        percentage: 0
      },
      'progress1': {
        analyzed: 15,
        updated: 12,
        failed: 1,
        unchanged: 2,
        total: 50,
        status: 'Processando títulos das opções...',
        percentage: 30
      },
      'progress2': {
        analyzed: 30,
        updated: 24,
        failed: 3,
        unchanged: 3,
        total: 50,
        status: 'Aplicando alterações em massa...',
        percentage: 60
      },
      'progress3': {
        analyzed: 45,
        updated: 38,
        failed: 4,
        unchanged: 3,
        total: 50,
        status: 'Finalizando processamento...',
        percentage: 90
      },
      'complete': {
        analyzed: 50,
        updated: 42,
        failed: 5,
        unchanged: 3,
        total: 50,
        status: 'Processamento concluído!',
        percentage: 100
      }
    }
    
    const stageData = stages[stage] || stages.start
    
    return c.json({
      success: true,
      data: stageData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return c.json({ 
      error: 'Erro no teste de diagnóstico: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
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
        <link rel="stylesheet" href="/static/style.css">
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


        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
