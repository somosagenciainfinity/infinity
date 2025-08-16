// Infinity Bulk Manager - Frontend JavaScript
class InfinityBulkManager {
    constructor() {
        this.shopName = '';
        this.accessToken = '';
        this.isConnected = false;
        this.allProducts = []; // TODOS os produtos carregados
        this.filteredProducts = []; // Produtos após filtro de coleção
        this.selectedProducts = new Set();
        this.collections = [];
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Connection form
        document.getElementById('connect-btn').addEventListener('click', () => this.testConnection());
        
        // Enter key support for connection form
        document.getElementById('shop-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.testConnection();
        });
        document.getElementById('access-token').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.testConnection();
        });
        
        // Main interface buttons
        document.getElementById('load-products-btn').addEventListener('click', () => this.loadProducts());
        document.getElementById('select-all-btn').addEventListener('click', () => this.selectAll());
        document.getElementById('clear-selection-btn').addEventListener('click', () => this.clearSelection());
        document.getElementById('bulk-edit-btn').addEventListener('click', () => this.openBulkModal());
        document.getElementById('variant-titles-btn').addEventListener('click', () => this.openVariantTitlesModal());
        
        // Collection filter (NOVO FILTRO SIMPLES)
        document.getElementById('collection-filter').addEventListener('change', () => this.filterByCollection());
        
        // Header select all checkbox
        document.getElementById('select-all-checkbox').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.selectAll();
            } else {
                this.clearSelection();
            }
        });
        
        // Bulk modal controls
        document.getElementById('close-modal').addEventListener('click', () => this.closeBulkModal());
        document.getElementById('cancel-bulk').addEventListener('click', () => this.closeBulkModal());
        document.getElementById('cancel-bulk-top').addEventListener('click', () => this.closeBulkModal()); // Novo botão topo
        document.getElementById('apply-bulk-top').addEventListener('click', (e) => this.submitBulkEditFromButton(e)); // Novo botão topo
        document.getElementById('bulk-edit-form').addEventListener('submit', (e) => this.submitBulkEdit(e));
        
        // Variant titles modal controls
        document.getElementById('close-variant-titles-modal').addEventListener('click', () => this.closeVariantTitlesModal());
        document.getElementById('cancel-variant-titles').addEventListener('click', () => this.closeVariantTitlesModal());
        document.getElementById('load-variant-data-btn').addEventListener('click', () => this.loadVariantData());
        document.getElementById('apply-variant-changes').addEventListener('click', () => this.applyVariantChanges());
        
        // Tab controls
        document.getElementById('tab-titles').addEventListener('click', () => this.switchTab('titles'));
        document.getElementById('tab-values').addEventListener('click', () => this.switchTab('values'));
        
        // Variant scope controls
        document.getElementById('scope-all').addEventListener('change', () => this.updateVariantScopeInfo());
        document.getElementById('scope-selected').addEventListener('change', () => this.updateVariantScopeInfo());
        
        // Results modal controls
        document.getElementById('close-results-modal').addEventListener('click', () => this.closeResultsModal());
        
        // Enable/disable form fields based on checkboxes
        this.setupFormFieldToggles();
        
        // Close modals when clicking outside
        this.setupModalClickOutside();
    }

    setupFormFieldToggles() {
        const fields = [
            'title', 'description', 'vendor', 'product-type', 'tags', 'status',
            'price', 'compare-price', 'inventory', 'sku', 'weight', 'track-inventory',
            'seo-title', 'seo-description'
        ];
        
        fields.forEach(field => {
            const checkbox = document.getElementById(`enable-${field}`);
            const input = document.getElementById(`bulk-${field}`);
            
            if (checkbox && input) {
                checkbox.addEventListener('change', () => {
                    input.disabled = !checkbox.checked;
                    if (!checkbox.checked) {
                        input.value = '';
                    }
                });
            }
        });
    }

    setupModalClickOutside() {
        const modals = ['bulk-modal', 'variant-titles-modal', 'results-modal'];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modalId);
                }
            });
        });
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    async testConnection() {
        const shopName = document.getElementById('shop-name').value.trim();
        const accessToken = document.getElementById('access-token').value.trim();
        const connectBtn = document.getElementById('connect-btn');
        const errorDiv = document.getElementById('connection-error');
        
        if (!shopName || !accessToken) {
            this.showError('Por favor, preencha todos os campos.');
            return;
        }
        
        // Show loading state
        const originalText = connectBtn.innerHTML;
        connectBtn.innerHTML = '<i class="fas fa-spinner loading-spinner mr-2"></i>Conectando...';
        connectBtn.disabled = true;
        errorDiv.classList.add('hidden');
        
        try {
            const response = await fetch('/api/test-connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shop: shopName,
                    accessToken: accessToken
                })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                this.shopName = shopName;
                this.accessToken = accessToken;
                this.isConnected = true;
                
                // Hide connection form and show main interface
                document.getElementById('connection-form').classList.add('hidden');
                document.getElementById('main-interface').classList.remove('hidden');
                
                // Update connection status
                const statusEl = document.getElementById('connection-status');
                statusEl.classList.remove('hidden');
                statusEl.innerHTML = `
                    <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        <i class="fas fa-check-circle mr-1"></i>
                        Conectado a ${data.shop} (${data.plan})
                    </span>
                `;
                
                // Load collections
                await this.loadCollections();
                
                this.showSuccess(`Conectado com sucesso à loja "${data.shop}"!`);
            } else {
                throw new Error(data.error || 'Erro na conexão');
            }
        } catch (error) {
            this.showError('Erro na conexão: ' + error.message);
        } finally {
            connectBtn.innerHTML = originalText;
            connectBtn.disabled = false;
        }
    }

    async loadCollections() {
        try {
            const response = await fetch('/api/collections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shop: this.shopName,
                    accessToken: this.accessToken
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.collections = data.collections || [];
                this.updateCollectionFilter();
            } else {
                console.error('Erro ao carregar coleções:', data.error);
                this.showError('Erro ao carregar coleções: ' + data.error);
            }
        } catch (error) {
            console.error('Erro ao carregar coleções:', error);
            this.showError('Erro ao carregar coleções: ' + error.message);
        }
    }

    updateCollectionFilter() {
        const select = document.getElementById('collection-filter');
        if (!select) return;
        
        // Limpar opções existentes
        select.innerHTML = '<option value="">📦 Todas as Coleções</option>';
        
        // Adicionar coleções carregadas
        this.collections.forEach(collection => {
            const option = document.createElement('option');
            option.value = collection.id;
            option.textContent = collection.title;
            select.appendChild(option);
        });
        
        console.log(`✅ Filtro atualizado com ${this.collections.length} coleções`);
    }
    
    filterByCollection() {
        const select = document.getElementById('collection-filter');
        const selectedCollectionId = select.value;
        
        // Verificar se há produtos carregados
        if (this.allProducts.length === 0) {
            this.showError('⚠️ Carregue os produtos primeiro antes de filtrar por coleção.');
            return;
        }
        
        // Mostrar loading rápido para feedback visual
        const loadingMsg = document.getElementById('loading-message');
        if (loadingMsg) {
            loadingMsg.textContent = 'Filtrando produtos...';
            document.getElementById('loading').classList.remove('hidden');
        }
        
        // Usar setTimeout para não bloquear a UI em listas grandes
        setTimeout(() => {
            try {
                if (!selectedCollectionId) {
                    // Mostrar todos os produtos
                    this.filteredProducts = [...this.allProducts];
                } else {
                    // Filtrar produtos pela coleção selecionada usando collection_ids
                    this.filteredProducts = this.allProducts.filter(product => {
                        // Verificar se o produto tem collection_ids e se inclui a coleção selecionada
                        return product.collection_ids && product.collection_ids.some(collectionId => 
                            collectionId.toString() === selectedCollectionId
                        );
                    });
                }
                
                // Atualizar a lista exibida
                this.products = this.filteredProducts;
                this.renderProducts();
                this.updateProductsCount();
                this.clearSelection();
                
                const collectionName = selectedCollectionId ? 
                    this.collections.find(c => c.id.toString() === selectedCollectionId)?.title || 'Coleção' :
                    'Todas as Coleções';
                    
                this.showSuccess(`🎯 Filtrado: ${this.products.length} produtos de "${collectionName}"`);
                
                // Esconder loading
                if (loadingMsg) {
                    document.getElementById('loading').classList.add('hidden');
                }
            } catch (error) {
                console.error('Erro ao filtrar:', error);
                this.showError('Erro ao filtrar produtos. Tente novamente.');
                if (loadingMsg) {
                    document.getElementById('loading').classList.add('hidden');
                }
            }
        }, 10); // Delay mínimo para não bloquear UI
    }

    async loadProducts() {
        const loadBtn = document.getElementById('load-products-btn');
        const loading = document.getElementById('loading');
        
        if (!this.isConnected) {
            this.showError('Conecte-se à sua loja Shopify primeiro.');
            return;
        }
        
        // Show loading state
        const originalText = loadBtn.innerHTML;
        loadBtn.innerHTML = '<i class="fas fa-spinner loading-spinner mr-2"></i>Carregando TODOS os produtos...';
        loadBtn.disabled = true;
        loading.classList.remove('hidden');
        
        try {
            console.log('🚀 Iniciando carregamento de TODOS os produtos...');
            
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shop: this.shopName,
                    accessToken: this.accessToken
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('✅ API Response completa:', data);
                console.log('✅ TOTAL de produtos recebidos:', data.products?.length || 0);
                
                if (data.products && data.products.length > 0) {
                    console.log('✅ Primeiro produto (amostra):', {
                        id: data.products[0].id,
                        title: data.products[0].title,
                        price: data.products[0].variants?.[0]?.price,
                        variants: data.products[0].variants?.length
                    });
                }
                
                // Armazena TODOS os produtos
                this.allProducts = data.products || [];
                this.filteredProducts = [...this.allProducts]; // Cópia inicial
                this.products = this.filteredProducts; // Para compatibilidade
                
                // Renderizar e atualizar contadores
                this.renderProducts();
                this.updateProductsCount();
                this.clearSelection();
                
                // Mostrar seção do filtro de coleções
                document.getElementById('collections-filter-section').classList.remove('hidden');
                
                this.showSuccess(`🎉 SUCESSO! Carregados ${this.products.length} produtos com preços corretos!`);
            } else {
                throw new Error(data.error || 'Erro ao carregar produtos');
            }
        } catch (error) {
            this.showError('❌ Erro ao carregar produtos: ' + error.message);
            this.products = [];
            this.renderProducts();
        } finally {
            loadBtn.innerHTML = originalText;
            loadBtn.disabled = false;
            loading.classList.add('hidden');
        }
    }

    renderProducts() {
        const tbody = document.getElementById('products-list');
        tbody.innerHTML = '';
        
        if (this.products.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-8 text-center text-gray-500">
                        <i class="fas fa-inbox text-4xl mb-4 block"></i>
                        Nenhum produto carregado. Clique em "Carregar Todos os Produtos".
                    </td>
                </tr>
            `;
            return;
        }
        
        console.log(`🔄 Renderizando ${this.products.length} produtos...`);
        
        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.className = 'product-row checkbox-row border-b hover:bg-gray-50';
            row.dataset.productId = product.id;
            
            // Calculate total inventory
            const totalInventory = product.variants?.reduce((sum, variant) => {
                return sum + (variant.inventory_quantity || 0);
            }, 0) || 0;
            
            // Get first variant for pricing with debugging
            const firstVariant = product.variants?.[0] || {};
            console.log(`Product ${product.id} (${product.title}):`, {
                hasVariants: !!product.variants,
                variantCount: product.variants?.length || 0,
                firstVariant: firstVariant,
                price: firstVariant.price,
                comparePrice: firstVariant.compare_at_price
            });
            
            const price = firstVariant.price || '0.00';
            const comparePrice = firstVariant.compare_at_price;
            
            row.innerHTML = `
                <td class="p-3 w-12">
                    <input type="checkbox" class="product-checkbox checkbox-large" 
                           data-product-id="${product.id}" 
                           ${this.selectedProducts.has(product.id.toString()) ? 'checked' : ''}>
                </td>
                <td class="p-3">
                    <div class="flex items-center">
                        ${product.image ? `<img src="${product.image.src}" class="w-10 h-10 object-cover rounded mr-3">` : ''}
                        <div>
                            <div class="font-medium text-gray-900">${product.title}</div>
                            <div class="text-sm text-gray-500">ID: ${product.id}</div>
                            ${product.variants?.length > 1 ? `<div class="text-xs text-blue-600">${product.variants.length} variantes</div>` : ''}
                        </div>
                    </div>
                </td>
                <td class="p-3">
                    <div class="text-gray-900">R$ ${price}</div>
                    ${comparePrice ? `<div class="text-sm text-gray-500 line-through">R$ ${comparePrice}</div>` : ''}
                </td>
                <td class="p-3">
                    <span class="px-2 py-1 text-xs rounded-full ${totalInventory > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${totalInventory}
                    </span>
                </td>
                <td class="p-3">
                    <span class="px-2 py-1 text-xs rounded-full ${this.getStatusColor(product.status)}">
                        ${this.getStatusText(product.status)}
                    </span>
                </td>
                <td class="p-3">
                    <div class="text-sm text-gray-600">
                        ${product.options && product.options.length > 0 ? 
                            product.options.map(opt => opt.name).join(', ') : 
                            'Nenhuma'
                        }
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Add event listeners to checkboxes and rows
        this.setupProductEventListeners();
    }

    setupProductEventListeners() {
        // Individual checkboxes
        document.querySelectorAll('.product-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation(); // Prevent row click
                this.handleProductSelection(e.target);
            });
        });
        
        // Row clicks (but not on checkbox)
        document.querySelectorAll('.product-row').forEach(row => {
            row.addEventListener('click', (e) => {
                // Don't trigger on checkbox clicks
                if (e.target.type === 'checkbox') {
                    return;
                }
                
                const checkbox = row.querySelector('.product-checkbox');
                checkbox.checked = !checkbox.checked;
                this.handleProductSelection(checkbox);
            });
        });
        
        // No individual variant buttons anymore
    }

    handleProductSelection(checkbox) {
        const productId = checkbox.dataset.productId;
        
        if (checkbox.checked) {
            this.selectedProducts.add(productId);
            checkbox.closest('.product-row').classList.add('selected');
        } else {
            this.selectedProducts.delete(productId);
            checkbox.closest('.product-row').classList.remove('selected');
        }
        
        this.updateSelectionInfo();
        this.updateSelectAllCheckbox();
        
        // Enable/disable bulk edit button
        const bulkBtn = document.getElementById('bulk-edit-btn');
        bulkBtn.disabled = this.selectedProducts.size === 0;
    }

    selectAll() {
        this.selectedProducts.clear();
        this.products.forEach(product => {
            this.selectedProducts.add(product.id.toString());
        });
        
        // Update UI
        document.querySelectorAll('.product-checkbox').forEach(checkbox => {
            checkbox.checked = true;
            checkbox.closest('.product-row').classList.add('selected');
        });
        
        this.updateSelectionInfo();
        this.updateSelectAllCheckbox();
        document.getElementById('bulk-edit-btn').disabled = false;
    }

    clearSelection() {
        this.selectedProducts.clear();
        
        // Update UI
        document.querySelectorAll('.product-checkbox').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('.product-row').classList.remove('selected');
        });
        
        this.updateSelectionInfo();
        this.updateSelectAllCheckbox();
        document.getElementById('bulk-edit-btn').disabled = true;
    }

    updateSelectAllCheckbox() {
        const selectAllCheckbox = document.getElementById('select-all-checkbox');
        const totalProducts = this.products.length;
        const selectedCount = this.selectedProducts.size;
        
        if (selectedCount === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (selectedCount === totalProducts) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        }
    }

    updateSelectionInfo() {
        const infoEl = document.getElementById('selection-info');
        const count = this.selectedProducts.size;
        
        if (count === 0) {
            infoEl.textContent = 'Nenhum produto selecionado';
        } else if (count === 1) {
            infoEl.textContent = '1 produto selecionado';
        } else {
            infoEl.textContent = `${count} produtos selecionados`;
        }
    }

    updateProductsCount() {
        const countEl = document.getElementById('products-count');
        const count = this.products.length;
        
        if (count === 0) {
            countEl.textContent = 'Nenhum produto carregado';
        } else {
            countEl.textContent = `${count} produtos carregados com preços corretos`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            case 'archived': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getStatusText(status) {
        switch (status) {
            case 'active': return 'Ativo';
            case 'draft': return 'Rascunho';
            case 'archived': return 'Arquivado';
            default: return status;
        }
    }

    openBulkModal() {
        if (this.selectedProducts.size === 0) {
            this.showError('Selecione pelo menos um produto para editar.');
            return;
        }
        
        const modal = document.getElementById('bulk-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Reset form
        document.getElementById('bulk-edit-form').reset();
        
        // Disable all fields initially
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.id.startsWith('enable-')) {
                checkbox.checked = false;
                const fieldId = checkbox.id.replace('enable-', 'bulk-');
                const field = document.getElementById(fieldId);
                if (field) field.disabled = true;
            }
        });
    }

    closeBulkModal() {
        this.closeModal('bulk-modal');
    }

    // Função para botão do topo (não é submit de form)
    async submitBulkEditFromButton(e) {
        e.preventDefault();
        
        // Simular evento de submit do form
        const form = document.getElementById('bulk-edit-form');
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
    }

    async submitBulkEdit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const updates = {};
        
        // Collect enabled fields
        const enabledFields = [
            'title', 'description', 'vendor', 'product-type', 'tags', 'status',
            'price', 'compare-price', 'inventory', 'sku', 'weight', 'track-inventory',
            'seo-title', 'seo-description'
        ];
        
        enabledFields.forEach(field => {
            const enableCheckbox = document.getElementById(`enable-${field}`);
            if (enableCheckbox && enableCheckbox.checked) {
                const fieldElement = document.getElementById(`bulk-${field}`);
                if (fieldElement) {
                    const value = fieldElement.value.trim();
                    
                    // Map field names to API format
                    switch (field) {
                        case 'product-type':
                            updates.productType = value;
                            break;
                        case 'compare-price':
                            updates.comparePrice = value;
                            break;
                        case 'seo-title':
                            updates.seoTitle = value;
                            break;
                        case 'seo-description':
                            updates.seoDescription = value;
                            break;
                        case 'track-inventory':
                            updates.trackInventory = value === 'true';
                            break;
                        default:
                            updates[field] = value;
                    }
                }
            }
        });
        
        if (Object.keys(updates).length === 0) {
            this.showError('Selecione pelo menos um campo para atualizar.');
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('apply-bulk');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner loading-spinner mr-2"></i>Aplicando...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/bulk-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shop: this.shopName,
                    accessToken: this.accessToken,
                    productIds: Array.from(this.selectedProducts),
                    updates: updates
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.closeBulkModal();
                this.showResults(data);
                
                // Remove auto-reload - let user manually refresh if needed
                // Products will stay visible after editing
            } else {
                throw new Error(data.error || 'Erro na atualização em massa');
            }
        } catch (error) {
            this.showError('Erro na atualização em massa: ' + error.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showResults(data) {
        const modal = document.getElementById('results-modal');
        const content = document.getElementById('results-content');
        
        const successCount = data.successful || 0;
        const failCount = data.failed || 0;
        const total = successCount + failCount;
        
        content.innerHTML = `
            <div class="mb-6">
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-blue-600">${total}</div>
                        <div class="text-sm text-blue-600">Total Processados</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-green-600">${successCount}</div>
                        <div class="text-sm text-green-600">Sucessos</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-red-600">${failCount}</div>
                        <div class="text-sm text-red-600">Falhas</div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">Progresso</span>
                        <span class="text-sm text-gray-600">${successCount}/${total}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: ${total > 0 ? (successCount/total)*100 : 0}%"></div>
                    </div>
                </div>
            </div>
            
            ${data.results && data.results.length > 0 ? `
                <div class="max-h-64 overflow-y-auto">
                    <h4 class="font-medium text-gray-800 mb-3">Detalhes:</h4>
                    <div class="space-y-2">
                        ${data.results.map(result => {
                            const product = this.allProducts.find(p => p.id.toString() === result.id.toString());
                            const productTitle = product ? product.title : `ID: ${result.id}`;
                            return `
                            <div class="flex items-center justify-between p-2 rounded ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                                <span class="text-sm font-medium">Produto: ${productTitle}</span>
                                ${result.success ? 
                                    '<span class="text-green-600 text-sm"><i class="fas fa-check mr-1"></i>Sucesso</span>' : 
                                    `<span class="text-red-600 text-sm" title="${result.error}"><i class="fas fa-times mr-1"></i>Erro</span>`
                                }
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        `;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    closeResultsModal() {
        this.closeModal('results-modal');
    }

    openVariantTitlesModal() {
        const modal = document.getElementById('variant-titles-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Reset state
        this.resetVariantModal();
        
        // Update scope information
        this.updateVariantScopeInfo();
    }

    resetVariantModal() {
        // Hide data container and show load button
        document.getElementById('variant-data-container').classList.add('hidden');
        document.getElementById('apply-variant-changes').classList.add('hidden');
        
        // Clear containers
        document.getElementById('existing-options-list').innerHTML = '';
        document.getElementById('existing-values-list').innerHTML = '';
        
        // Reset tabs
        this.switchTab('titles');
    }

    closeVariantTitlesModal() {
        this.closeModal('variant-titles-modal');
    }

    switchTab(tab) {
        // Update tab buttons
        const titleTab = document.getElementById('tab-titles');
        const valueTab = document.getElementById('tab-values');
        
        if (tab === 'titles') {
            titleTab.className = 'px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50';
            valueTab.className = 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700';
            
            document.getElementById('content-titles').classList.remove('hidden');
            document.getElementById('content-values').classList.add('hidden');
        } else {
            titleTab.className = 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700';
            valueTab.className = 'px-4 py-2 text-sm font-medium text-orange-600 border-b-2 border-orange-600 bg-orange-50';
            
            document.getElementById('content-titles').classList.add('hidden');
            document.getElementById('content-values').classList.remove('hidden');
        }
    }

    updateVariantScopeInfo() {
        const scopeAll = document.getElementById('scope-all');
        const scopeInfoText = document.getElementById('scope-info-text');
        const selectedCountDisplay = document.getElementById('selected-count-display');
        
        if (scopeAll.checked) {
            scopeInfoText.textContent = 'As alterações serão aplicadas a todos os produtos que possuem as opções especificadas';
        } else {
            const selectedCount = this.selectedProducts.size;
            scopeInfoText.textContent = `As alterações serão aplicadas apenas aos ${selectedCount} produtos selecionados que possuem as opções especificadas`;
            selectedCountDisplay.textContent = `Aplicar apenas aos ${selectedCount} produtos selecionados na tabela`;
        }
    }

    async loadVariantData() {
        const loadBtn = document.getElementById('load-variant-data-btn');
        const loading = document.getElementById('loading-variants');
        
        if (!this.isConnected) {
            this.showError('Conecte-se à sua loja Shopify primeiro.');
            return;
        }
        
        const originalText = loadBtn.innerHTML;
        loadBtn.innerHTML = '<i class="fas fa-spinner loading-spinner mr-2"></i>Carregando...';
        loadBtn.disabled = true;
        loading.classList.remove('hidden');
        
        try {
            const response = await fetch('/api/analyze-variants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shop: this.shopName,
                    accessToken: this.accessToken
                })
            });
            
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error('Resposta inválida do servidor: ' + jsonError.message);
            }
            
            if (response.ok) {
                this.variantData = data;
                
                // Verificar se os dados existem antes de renderizar
                if (data.optionStats && typeof data.optionStats === 'object') {
                    this.renderVariantOptions(data.optionStats);
                    this.renderVariantValues(data.optionStats, data.sampleVariants || []);
                } else {
                    throw new Error('Dados de variantes inválidos recebidos');
                }
                
                // Show data container and apply button
                document.getElementById('variant-data-container').classList.remove('hidden');
                document.getElementById('apply-variant-changes').classList.remove('hidden');
                
                this.showSuccess(`Analisados ${data.totalProducts} produtos com variantes encontradas`);
            } else {
                throw new Error(data.error || 'Erro ao analisar variantes');
            }
        } catch (error) {
            this.showError('Erro ao analisar variantes: ' + error.message);
        } finally {
            loadBtn.innerHTML = originalText;
            loadBtn.disabled = false;
            loading.classList.add('hidden');
        }
    }

    renderVariantOptions(optionStats) {
        const container = document.getElementById('existing-options-list');
        container.innerHTML = '';
        
        Object.keys(optionStats).forEach((optionName, index) => {
            const option = optionStats[optionName];
            
            const optionDiv = document.createElement('div');
            optionDiv.className = 'bg-gray-50 rounded-lg p-4 border border-gray-200';
            optionDiv.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Opção Atual</label>
                        <div class="bg-white p-2 border rounded text-sm font-medium">${optionName}</div>
                        <div class="text-xs text-gray-500 mt-1">${option.productCount} produtos</div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Novo Nome</label>
                        <input type="text" class="option-rename w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" 
                               data-current-name="${optionName}" placeholder="${optionName}">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Valores Atuais</label>
                        <div class="text-xs text-gray-600 max-h-16 overflow-y-auto">
                            ${option.values.slice(0, 5).join(', ')}
                            ${option.values.length > 5 ? `... (+${option.values.length - 5} mais)` : ''}
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-center">
                        <label class="flex items-center">
                            <input type="checkbox" class="rename-enabled mr-2 transform scale-110" data-option="${optionName}">
                            <span class="text-sm font-medium text-gray-700">Renomear</span>
                        </label>
                    </div>
                </div>
            `;
            
            container.appendChild(optionDiv);
        });
        
        if (Object.keys(optionStats).length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8">Nenhuma opção de variante encontrada</div>';
        }
    }

    renderVariantValues(optionStats, sampleVariants) {
        const container = document.getElementById('existing-values-list');
        container.innerHTML = '';
        
        Object.keys(optionStats).forEach(optionName => {
            const option = optionStats[optionName];
            
            const optionDiv = document.createElement('div');
            optionDiv.className = 'bg-gray-50 rounded-lg p-4 border border-gray-200';
            optionDiv.innerHTML = `
                <div class="mb-4">
                    <h5 class="font-bold text-gray-800 text-lg mb-2">${optionName}</h5>
                    <div class="text-sm text-gray-600">Em ${option.productCount} produtos</div>
                </div>
                
                <div class="space-y-3">
                    <h6 class="font-medium text-gray-700">Valores Encontrados:</h6>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${option.values.map(value => `
                            <div class="bg-white border rounded p-3">
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-600 mb-1">Valor Atual</label>
                                        <div class="text-sm font-medium">${value}</div>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-600 mb-1">Novo Valor</label>
                                        <input type="text" class="value-rename w-full p-1 text-sm border rounded" 
                                               data-option="${optionName}" data-current-value="${value}" placeholder="${value}">
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Preço Extra (R$)</label>
                                    <input type="number" step="0.01" class="value-price-extra w-full p-1 text-sm border rounded" 
                                           data-option="${optionName}" data-current-value="${value}" placeholder="0.00">
                                </div>
                                <div class="mt-2">
                                    <label class="flex items-center text-xs">
                                        <input type="checkbox" class="value-enabled mr-1" data-option="${optionName}" data-current-value="${value}">
                                        <span>Aplicar alterações</span>
                                    </label>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            container.appendChild(optionDiv);
        });
        
        if (Object.keys(optionStats).length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8">Nenhuma opção de variante encontrada</div>';
        }
    }

    async applyVariantChanges() {
        // Collect all changes
        const titleMappings = [];
        const valueChanges = [];
        
        // Collect title changes
        document.querySelectorAll('.rename-enabled:checked').forEach(checkbox => {
            const optionName = checkbox.dataset.option;
            const newNameInput = document.querySelector(`.option-rename[data-current-name="${optionName}"]`);
            const newName = newNameInput.value.trim();
            
            if (newName && newName !== optionName) {
                titleMappings.push({
                    currentTitle: optionName,
                    newTitle: newName
                });
            }
        });
        
        // Collect value changes
        document.querySelectorAll('.value-enabled:checked').forEach(checkbox => {
            const optionName = checkbox.dataset.option;
            const currentValue = checkbox.dataset.currentValue;
            const newValueInput = document.querySelector(`.value-rename[data-option="${optionName}"][data-current-value="${currentValue}"]`);
            const priceExtraInput = document.querySelector(`.value-price-extra[data-option="${optionName}"][data-current-value="${currentValue}"]`);
            
            const newValue = newValueInput.value.trim();
            const priceExtra = priceExtraInput.value.trim();
            
            if ((newValue && newValue !== currentValue) || priceExtra) {
                valueChanges.push({
                    optionName: optionName,
                    currentValue: currentValue,
                    newValue: newValue || currentValue,
                    priceExtra: priceExtra ? parseFloat(priceExtra) : 0
                });
            }
        });
        
        if (titleMappings.length === 0 && valueChanges.length === 0) {
            this.showError('Selecione pelo menos uma alteração para aplicar.');
            return;
        }
        
        const applyBtn = document.getElementById('apply-variant-changes');
        const originalText = applyBtn.innerHTML;
        applyBtn.innerHTML = '<i class="fas fa-spinner loading-spinner mr-2"></i>Processando...';
        applyBtn.disabled = true;
        
        try {
            // Get selected scope
            const scopeAll = document.getElementById('scope-all').checked;
            const selectedProductIds = scopeAll ? null : Array.from(this.selectedProducts);
            
            // Apply title changes first if any
            let titleResults = null;
            if (titleMappings.length > 0) {
                const titleResponse = await fetch('/api/bulk-update-variant-titles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        shop: this.shopName,
                        accessToken: this.accessToken,
                        titleMappings: titleMappings,
                        scope: scopeAll ? 'all' : 'selected',
                        selectedProductIds: selectedProductIds
                    })
                });
                
                titleResults = await titleResponse.json();
                if (!titleResponse.ok) {
                    throw new Error(titleResults.error || 'Erro na atualização de títulos');
                }
            }
            
            // TODO: Apply value changes (this would need a new API endpoint)
            let valueResults = null;
            if (valueChanges.length > 0) {
                // For now, just show that value changes are not yet implemented
                this.showError('Edição de valores de variantes será implementada em breve. Títulos foram atualizados com sucesso.');
            }
            
            this.closeVariantTitlesModal();
            
            if (titleResults) {
                this.showVariantTitlesResults(titleResults);
            }
            
            // Reload products to show updated data
            setTimeout(() => {
                this.loadProducts();
            }, 2000);
            
        } catch (error) {
            this.showError('Erro nas alterações de variantes: ' + error.message);
        } finally {
            applyBtn.innerHTML = originalText;
            applyBtn.disabled = false;
        }
    }

    showVariantTitlesResults(data) {
        const modal = document.getElementById('results-modal');
        const content = document.getElementById('results-content');
        
        const updatedCount = data.updatedCount || 0;
        const failedCount = data.failedCount || 0;
        const totalProducts = data.totalProducts || 0;
        
        content.innerHTML = `
            <div class="mb-6">
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    <i class="fas fa-tags mr-2"></i>
                    Resultados da Atualização de Títulos de Variantes
                </h4>
                
                <div class="grid grid-cols-4 gap-4 mb-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-blue-600">${totalProducts}</div>
                        <div class="text-sm text-blue-600">Produtos Analisados</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-green-600">${updatedCount}</div>
                        <div class="text-sm text-green-600">Produtos Atualizados</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-red-600">${failedCount}</div>
                        <div class="text-sm text-red-600">Falhas</div>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-yellow-600">${totalProducts - updatedCount - failedCount}</div>
                        <div class="text-sm text-yellow-600">Sem Alteração</div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">Progresso</span>
                        <span class="text-sm text-gray-600">${updatedCount}/${totalProducts}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: ${totalProducts > 0 ? (updatedCount/totalProducts)*100 : 0}%"></div>
                    </div>
                </div>
            </div>
            
            ${data.results && data.results.length > 0 ? `
                <div class="max-h-64 overflow-y-auto">
                    <h5 class="font-medium text-gray-800 mb-3">Produtos Atualizados (${data.results.length} primeiros):</h5>
                    <div class="space-y-2">
                        ${data.results.filter(r => r.success).map(result => `
                            <div class="flex items-center justify-between p-3 rounded bg-green-50 border border-green-200">
                                <div>
                                    <span class="font-medium text-gray-800">${result.title}</span>
                                    <div class="text-sm text-gray-600">ID: ${result.productId}</div>
                                </div>
                                <div class="text-right">
                                    <span class="text-green-600 text-sm"><i class="fas fa-check mr-1"></i>Sucesso</span>
                                    <div class="text-xs text-gray-500">Variantes: ${result.changes}</div>
                                </div>
                            </div>
                        `).join('')}
                        ${data.results.filter(r => !r.success).map(result => `
                            <div class="flex items-center justify-between p-3 rounded bg-red-50 border border-red-200">
                                <div>
                                    <span class="font-medium text-gray-800">${result.title}</span>
                                    <div class="text-sm text-gray-600">ID: ${result.productId}</div>
                                </div>
                                <span class="text-red-600 text-sm" title="${result.error}"><i class="fas fa-times mr-1"></i>Erro</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    showError(message) {
        this.showNotification(message, 'error');
        
        // Also show in connection error div if connection form is visible
        const connectionForm = document.getElementById('connection-form');
        if (!connectionForm.classList.contains('hidden')) {
            const errorDiv = document.getElementById('connection-error');
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        
        if (type === 'error') {
            notification.className += ' bg-red-500 text-white';
            notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
        } else if (type === 'success') {
            notification.className += ' bg-green-500 text-white';
            notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
        } else {
            notification.className += ' bg-blue-500 text-white';
            notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new InfinityBulkManager();
});