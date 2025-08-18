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
        
        // Progress monitoring
        this.currentOperation = null;
        this.progressData = {
            analyzed: 0,
            updated: 0,
            failed: 0,
            unchanged: 0,
            total: 0,
            status: 'Preparando processamento...'
        };
        this.progressInterval = null;
        this.isProgressVisible = false;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Helper function to safely add event listeners
        const addListener = (id, event, handler) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener(event, handler);
            } else {
                console.warn(`Element with ID '${id}' not found`);
            }
        };

        // Connection form
        addListener('connect-btn', 'click', () => this.testConnection());
        
        // Enter key support for connection form
        addListener('shop-name', 'keypress', (e) => {
            if (e.key === 'Enter') this.testConnection();
        });
        addListener('access-token', 'keypress', (e) => {
            if (e.key === 'Enter') this.testConnection();
        });
        
        // Main interface buttons
        addListener('load-products-btn', 'click', () => this.loadProducts());
        addListener('select-all-btn', 'click', () => this.selectAll());
        addListener('clear-selection-btn', 'click', () => this.clearSelection());
        addListener('bulk-edit-btn', 'click', () => this.openBulkModal());
        addListener('variant-titles-btn', 'click', () => this.openVariantTitlesModal());
        
        // Collection filter (NOVO FILTRO SIMPLES)
        addListener('collection-filter', 'change', () => this.filterByCollection());
        
        // Header select all checkbox
        addListener('select-all-checkbox', 'change', (e) => {
            if (e.target.checked) {
                this.selectAll();
            } else {
                this.clearSelection();
            }
        });
        
        // Bulk modal controls
        addListener('close-modal', 'click', () => this.closeBulkModal());
        addListener('cancel-bulk', 'click', () => this.closeBulkModal());
        addListener('bulk-edit-form', 'submit', (e) => this.submitBulkEdit(e));
        
        // Variant titles modal controls
        addListener('close-variant-titles-modal', 'click', () => this.closeVariantTitlesModal());
        addListener('cancel-variant-titles', 'click', () => this.closeVariantTitlesModal());
        addListener('load-variant-data-btn', 'click', () => this.loadVariantData());
        addListener('apply-variant-changes', 'click', () => this.applyVariantChanges());
        
        // Tab controls
        addListener('tab-titles', 'click', () => this.switchTab('titles'));
        addListener('tab-values', 'click', () => this.switchTab('values'));
        
        // Load scope controls
        addListener('load-scope-all', 'change', () => this.updateLoadScopeInfo());
        addListener('load-scope-selected', 'change', () => this.updateLoadScopeInfo());
        
        // Results modal controls
        addListener('close-results-modal', 'click', () => this.closeResultsModal());
        
        // Progress modal controls (these elements don't exist in current HTML)
        // addListener('close-progress-modal', 'click', () => this.closeProgressModal());
        // addListener('cancel-progress', 'click', () => this.cancelProgress());
        // addListener('hide-progress', 'click', () => this.hideProgressModal());
        
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
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modalId);
                    }
                });
            } else {
                console.warn(`Modal with ID '${modalId}' not found`);
            }
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
        
        // SPEED: Enhanced loading state with performance focus
        const originalText = loadBtn.innerHTML;
        loadBtn.innerHTML = '<i class="fas fa-rocket loading-spinner mr-2"></i>Carregamento Ultra-Rápido...';
        loadBtn.disabled = true;
        loading.classList.remove('hidden');
        
        // SPEED: Add real-time progress indicator
        const loadingMessage = loading.querySelector('p');
        if (loadingMessage) {
            loadingMessage.textContent = '⚡ Iniciando carregamento otimizado de produtos...';
        }
        
        try {
            console.log('⚡ Iniciando carregamento ULTRA-RÁPIDO de produtos...');
            
            // SPEED: Update progress message
            if (loadingMessage) {
                loadingMessage.textContent = '⚡ Buscando produtos com cache otimizado...';
            }
            
            const startTime = Date.now();
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
                const loadTime = Date.now() - startTime;
                console.log('⚡ API Response ultra-rápida:', data);
                console.log('⚡ TOTAL de produtos recebidos em', loadTime, 'ms:', data.products?.length || 0);
                
                // SPEED: Update progress
                if (loadingMessage) {
                    loadingMessage.textContent = `⚡ Renderizando ${data.products?.length || 0} produtos...`;
                }
                
                if (data.products && data.products.length > 0) {
                    console.log('⚡ Primeiro produto (amostra):', {
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
                
                // SPEED: Show rendering progress
                if (loadingMessage) {
                    loadingMessage.textContent = '⚡ Finalizando renderização da interface...';
                }
                
                // Renderizar e atualizar contadores
                this.renderProducts();
                this.updateProductsCount();
                this.clearSelection();
                
                // Mostrar seção do filtro de coleções
                document.getElementById('collections-filter-section').classList.remove('hidden');
                
                // SPEED: Enhanced success message with performance metrics
                const performanceInfo = loadTime < 1000 ? 'ULTRA-RÁPIDO' : loadTime < 3000 ? 'RÁPIDO' : 'CONCLUÍDO';
                this.showSuccess(`⚡ ${performanceInfo}! ${this.products.length} produtos carregados em ${loadTime}ms!`);
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
            row.className = 'product-row checkbox-row border-b border-gray-700 hover:bg-gray-800 text-gray-300';
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
                    <input type="checkbox" class="product-checkbox checkbox-large accent-orange-400" 
                           data-product-id="${product.id}" 
                           ${this.selectedProducts.has(product.id.toString()) ? 'checked' : ''}>
                </td>
                <td class="p-3">
                    <div class="flex items-center">
                        ${product.image ? `<img src="${product.image.src}" class="w-10 h-10 object-cover rounded mr-3">` : ''}
                        <div>
                            <div class="font-medium text-white">${product.title}</div>
                            <div class="text-sm text-gray-400">ID: ${product.id}</div>
                            ${product.variants?.length > 1 ? `<div class="text-xs text-orange-400">${product.variants.length} variantes</div>` : ''}
                        </div>
                    </div>
                </td>
                <td class="p-3">
                    <div class="text-orange-300 font-medium">R$ ${price}</div>
                    ${comparePrice ? `<div class="text-sm text-gray-400 line-through">R$ ${comparePrice}</div>` : ''}
                </td>
                <td class="p-3">
                    <span class="px-2 py-1 text-xs rounded-full ${totalInventory > 0 ? 'bg-green-800 text-green-200 border border-green-600' : 'bg-red-800 text-red-200 border border-red-600'}">
                        ${totalInventory}
                    </span>
                </td>
                <td class="p-3">
                    <span class="px-2 py-1 text-xs rounded-full ${this.getStatusColor(product.status)}">
                        ${this.getStatusText(product.status)}
                    </span>
                </td>
                <td class="p-3">
                    <div class="text-sm text-gray-300">
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
            case 'active': return 'bg-green-800 text-green-200 border border-green-600';
            case 'draft': return 'bg-yellow-800 text-yellow-200 border border-yellow-600';
            case 'archived': return 'bg-gray-800 text-gray-200 border border-gray-600';
            default: return 'bg-gray-800 text-gray-200 border border-gray-600';
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
        
        // Show loading state and create "Ver Detalhes" button
        const submitBtn = document.getElementById('apply-bulk');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner loading-spinner mr-2"></i>Processando...';
        submitBtn.disabled = true;
        
        // Initialize progress monitoring
        const totalProducts = this.selectedProducts.size;
        this.currentOperation = 'bulk-edit';
        this.progressData = {
            analyzed: 0,
            updated: 0,
            failed: 0,
            unchanged: 0,
            total: totalProducts,
            status: 'Iniciando processamento em massa...'
        };
        
        // Create "Ver Detalhes" button
        this.createVerDetalhesButton('apply-bulk');
        
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
                // Enhanced feedback with mass processing details
                console.log('🚀 BULK UPDATE RESPONSE:', data);
                
                // Update progress with final results
                this.progressData.updated = data.successful || 0;
                this.progressData.failed = data.failed || 0;
                this.progressData.totalProcessed = data.totalProcessed || totalProducts;
                this.progressData.unchanged = Math.max(0, this.progressData.totalProcessed - this.progressData.updated - this.progressData.failed);
                this.progressData.analyzed = this.progressData.totalProcessed;
                
                // Enhanced status with performance info
                if (data.massProcessingUsed) {
                    const throughput = data.throughput ? ` (${data.throughput.toFixed(1)} produtos/s)` : '';
                    const processingTime = data.processingTime ? ` em ${(data.processingTime/1000).toFixed(1)}s` : '';
                    this.progressData.status = `✅ Processamento em massa concluído${processingTime}${throughput}`;
                } else {
                    this.progressData.status = 'Processamento concluído!';
                }
                
                this.closeBulkModal();
                this.showEnhancedResults(data);
                
                // Enhanced success message
                const performanceMsg = data.throughput ? ` (${data.throughput.toFixed(1)} produtos/segundo)` : '';
                this.showSuccess(`🚀 PROCESSAMENTO ULTRA-RÁPIDO: ${data.successful}/${data.totalProcessed} produtos atualizados${performanceMsg}`);
                
                // Remove auto-reload - let user manually refresh if needed
                // Products will stay visible after editing
            } else {
                throw new Error(data.error || 'Erro na atualização em massa');
            }
        } catch (error) {
            this.progressData.status = 'Erro no processamento: ' + error.message;
            this.showError('Erro na atualização em massa: ' + error.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Remove "Ver Detalhes" button after delay
            setTimeout(() => {
                this.removeVerDetalhesButton();
                this.currentOperation = null;
            }, 10000);
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

    showEnhancedResults(data) {
        const modal = document.getElementById('results-modal');
        const content = document.getElementById('results-content');
        
        const successCount = data.successful || 0;
        const failCount = data.failed || 0;
        const totalProcessed = data.totalProcessed || (successCount + failCount);
        const failedToLoad = data.failedToLoad || 0;
        
        // Performance metrics
        const throughput = data.throughput || 0;
        const processingTime = data.processingTime || 0;
        const successRate = data.successRate || (totalProcessed > 0 ? (successCount / totalProcessed * 100) : 0);
        
        content.innerHTML = `
            <div class="mb-6">
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 mb-4">
                    <h3 class="text-lg font-bold mb-2">
                        <i class="fas fa-rocket mr-2"></i>
                        Processamento em Massa Ultra-Rápido ${data.massProcessingUsed ? '(OTIMIZADO)' : ''}
                    </h3>
                    ${processingTime > 0 ? `
                    <div class="flex justify-between items-center text-sm opacity-90">
                        <span>⏱️ Tempo: ${(processingTime/1000).toFixed(1)}s</span>
                        ${throughput > 0 ? `<span>⚡ Velocidade: ${throughput.toFixed(1)} produtos/s</span>` : ''}
                        <span>🎯 Taxa de sucesso: ${successRate.toFixed(1)}%</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="grid grid-cols-4 gap-4 mb-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-blue-600">${totalProcessed}</div>
                        <div class="text-sm text-blue-600">Processados</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-green-600">${successCount}</div>
                        <div class="text-sm text-green-600">Sucessos</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-red-600">${failCount}</div>
                        <div class="text-sm text-red-600">Falhas</div>
                    </div>
                    ${failedToLoad > 0 ? `
                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-orange-600">${failedToLoad}</div>
                        <div class="text-sm text-orange-600">Não Carregados</div>
                    </div>
                    ` : `
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                        <div class="text-2xl font-bold text-gray-600">${Math.max(0, totalProcessed - successCount - failCount)}</div>
                        <div class="text-sm text-gray-600">Sem Alteração</div>
                    </div>
                    `}
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">Progresso</span>
                        <span class="text-sm text-gray-600">${successCount}/${totalProcessed}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300" 
                             style="width: ${totalProcessed > 0 ? (successCount/totalProcessed)*100 : 0}%"></div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1 text-center">
                        ${successRate.toFixed(1)}% de sucesso
                    </div>
                </div>
            </div>
            
            ${data.results && data.results.length > 0 ? `
                <div class="max-h-64 overflow-y-auto">
                    <h4 class="font-medium text-gray-800 mb-3 flex items-center">
                        <i class="fas fa-list mr-2"></i>
                        Detalhes (${data.results.length} produtos):
                    </h4>
                    <div class="space-y-2">
                        ${data.results.map(result => {
                            const product = this.allProducts.find(p => p.id.toString() === result.id.toString());
                            const productTitle = product ? product.title.substring(0, 50) : `ID: ${result.id}`;
                            return `
                            <div class="flex items-center justify-between p-3 rounded transition-colors hover:bg-gray-50 ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm font-medium text-gray-800 truncate">${productTitle}</div>
                                    <div class="text-xs text-gray-500">ID: ${result.id}</div>
                                </div>
                                <div class="flex-shrink-0 ml-4">
                                    ${result.success ? 
                                        '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><i class="fas fa-check mr-1"></i>Sucesso</span>' : 
                                        `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800" title="${result.error}"><i class="fas fa-times mr-1"></i>Erro</span>`
                                    }
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${data.massProcessingUsed ? `
                <div class="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p class="text-sm text-blue-800">
                        <i class="fas fa-info-circle mr-2"></i>
                        <strong>Processamento Otimizado:</strong> Utilizou chunks paralelos para máxima velocidade e eficiência.
                    </p>
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
        
        // Update load scope information
        this.updateLoadScopeInfo();
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



    updateLoadScopeInfo() {
        const selectedCount = this.selectedProducts.size;
        const loadScopeSelectedText = document.getElementById('load-scope-selected-text');
        loadScopeSelectedText.textContent = `Apenas produtos selecionados (${selectedCount} produtos)`;
    }

    async loadVariantData() {
        const loadBtn = document.getElementById('load-variant-data-btn');
        const loading = document.getElementById('loading-variants');
        
        if (!this.isConnected) {
            this.showError('Conecte-se à sua loja Shopify primeiro.');
            return;
        }
        
        const originalText = loadBtn.innerHTML;
        // SPEED: Enhanced loading feedback
        loadBtn.innerHTML = '<i class="fas fa-rocket loading-spinner mr-2"></i>Carregamento Ultra-Rápido...';
        loadBtn.disabled = true;
        loading.classList.remove('hidden');
        
        // SPEED: Add progress indicator
        const progressElement = document.createElement('div');
        progressElement.id = 'variant-load-progress';
        progressElement.className = 'mt-2 text-sm text-blue-600 font-medium';
        progressElement.textContent = '⚡ Iniciando carregamento otimizado...';
        loading.appendChild(progressElement);
        
        try {
            // SPEED: Show optimized progress messages
            progressElement.textContent = '⚡ Verificando escopo de produtos...';
            await new Promise(resolve => setTimeout(resolve, 100)); // Brief delay for UX
            
            // Verificar qual escopo foi selecionado
            const loadScopeAll = document.getElementById('load-scope-all').checked;
            const selectedProductIds = loadScopeAll ? null : Array.from(this.selectedProducts);
            
            // Validar se tem produtos selecionados quando necessário
            if (!loadScopeAll && selectedProductIds.length === 0) {
                this.showError('⚠️ Selecione pelo menos um produto na tabela para carregar apenas variantes dos produtos selecionados.');
                return;
            }
            
            // SPEED: Update progress
            const productCount = loadScopeAll ? 'todos os' : selectedProductIds.length;
            progressElement.textContent = `⚡ Analisando variantes de ${productCount} produtos...`;
            
            const startTime = Date.now();
            const response = await fetch('/api/analyze-variants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shop: this.shopName,
                    accessToken: this.accessToken,
                    scope: loadScopeAll ? 'all' : 'selected',
                    selectedProductIds: selectedProductIds
                })
            });
            
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error('Resposta inválida do servidor: ' + jsonError.message);
            }
            
            if (response.ok) {
                const loadTime = Date.now() - startTime;
                
                // SPEED: Show performance metrics
                progressElement.textContent = `⚡ Análise concluída em ${loadTime}ms - Renderizando interface...`;
                
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
                
                // SPEED: Enhanced success message with performance info
                const optionCount = Object.keys(data.optionStats).length;
                const performanceInfo = data.performanceMs ? ` (${data.performanceMs}ms)` : '';
                this.showSuccess(`⚡ ULTRA-RÁPIDO: ${data.totalProducts} produtos, ${optionCount} opções analisadas${performanceInfo}`);
            } else {
                throw new Error(data.error || 'Erro ao analisar variantes');
            }
        } catch (error) {
            this.showError('Erro ao analisar variantes: ' + error.message);
        } finally {
            loadBtn.innerHTML = originalText;
            loadBtn.disabled = false;
            loading.classList.add('hidden');
            
            // SPEED: Clean up progress element
            const progressEl = document.getElementById('variant-load-progress');
            if (progressEl) {
                progressEl.remove();
            }
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
        
        // Initialize progress monitoring for variants
        const loadScopeAll = document.getElementById('load-scope-all').checked;
        const totalProducts = loadScopeAll ? this.variantData?.totalProducts || this.allProducts.length : this.selectedProducts.size;
        
        this.progressData = {
            analyzed: 0,
            updated: 0,
            failed: 0,
            unchanged: 0,
            total: totalProducts,
            status: titleMappings.length > 0 && valueChanges.length > 0 ? 
                'Processando títulos e valores das variantes...' :
                titleMappings.length > 0 ? 'Processando títulos das variantes...' :
                'Processando valores e preços das variantes...'
        };
        
        // Determine operation type
        const operationType = titleMappings.length > 0 && valueChanges.length > 0 ? 
            'variant-titles-values' : 
            titleMappings.length > 0 ? 'variant-titles' : 'variant-values';
        
        this.currentOperation = operationType;
        
        // Create "Ver Detalhes" button
        this.createVerDetalhesButton('apply-variant-changes');
        
        try {
            // Use the same scope that was used for loading variants
            const loadScopeAll = document.getElementById('load-scope-all').checked;
            const selectedProductIds = loadScopeAll ? null : Array.from(this.selectedProducts);
            
            // Apply title changes first if any
            let titleResults = null;
            if (titleMappings.length > 0) {
                this.progressData.status = 'Processando títulos das variantes...';
                
                // REAL-TIME: Start the bulk update operation
                const titleResponse = await fetch('/api/bulk-update-variant-titles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        shop: this.shopName,
                        accessToken: this.accessToken,
                        titleMappings: titleMappings,
                        scope: loadScopeAll ? 'all' : 'selected',
                        selectedProductIds: selectedProductIds
                    })
                });
                
                titleResults = await titleResponse.json();
                if (!titleResponse.ok) {
                    throw new Error(titleResults.error || 'Erro na atualização de títulos');
                }
                
                // REAL-TIME: If operation returns an operationId, start polling for progress
                if (titleResults.operationId) {
                    console.log(`🔄 Starting real-time progress tracking for operation: ${titleResults.operationId}`);
                    await this.pollOperationProgress(titleResults.operationId);
                } else {
                    // Fallback: Use static results if no operationId (backward compatibility)
                    if (titleResults) {
                        this.progressData.updated += titleResults.updatedCount || 0;
                        this.progressData.failed += titleResults.failedCount || 0;
                        this.progressData.analyzed = titleResults.totalProducts || 0;
                    }
                }
            }
            
            // Apply value changes if any
            let valueResults = null;
            if (valueChanges.length > 0) {
                this.progressData.status = 'Processando valores e preços das variantes...';
                
                const valueResponse = await fetch('/api/bulk-update-variant-values', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        shop: this.shopName,
                        accessToken: this.accessToken,
                        valueMappings: valueChanges,
                        scope: loadScopeAll ? 'all' : 'selected',
                        selectedProductIds: selectedProductIds
                    })
                });
                
                valueResults = await valueResponse.json();
                if (!valueResponse.ok) {
                    throw new Error(valueResults.error || 'Erro na atualização de valores');
                }
                
                // REAL-TIME: If operation returns an operationId, start polling for progress
                if (valueResults.operationId) {
                    console.log(`🔄 Starting real-time progress tracking for values operation: ${valueResults.operationId}`);
                    await this.pollOperationProgress(valueResults.operationId);
                } else {
                    // Fallback: Use static results if no operationId (backward compatibility)
                    if (valueResults) {
                        // If we didn't process titles, use value results directly
                        if (!titleResults) {
                            this.progressData.updated = valueResults.updatedCount || 0;
                            this.progressData.failed = valueResults.failedCount || 0;
                            this.progressData.analyzed = valueResults.totalProducts || 0;
                        } else {
                            // Combine results (take max values as they might overlap)
                            this.progressData.updated = Math.max(this.progressData.updated, valueResults.updatedCount || 0);
                            this.progressData.failed = Math.max(this.progressData.failed, valueResults.failedCount || 0);
                        }
                    }
                }
            }
            
            // Calculate unchanged
            this.progressData.unchanged = Math.max(0, 
                this.progressData.total - this.progressData.updated - this.progressData.failed
            );
            this.progressData.status = 'Processamento concluído!';
            
            // Handle different scenarios
            if (titleResults && valueResults) {
                // Both titles and values were changed successfully
                this.closeVariantTitlesModal();
                this.showVariantTitlesResults(titleResults);
                this.showSuccess(`✅ Alterações aplicadas com sucesso! Títulos: ${titleResults.updatedCount} produtos, Valores: ${valueResults.updatedCount} produtos atualizados.`);
            } else if (titleResults) {
                // Only titles were changed and succeeded
                this.closeVariantTitlesModal();
                this.showVariantTitlesResults(titleResults);
            } else if (valueResults) {
                // Only values were changed and succeeded
                this.closeVariantTitlesModal();
                this.showVariantValuesResults(valueResults);
            }
            
            // Note: Manual reload removed to prevent automatic reloading
            // User can manually reload products using the "Carregar Todos os Produtos" button if needed
            
        } catch (error) {
            this.progressData.status = 'Erro no processamento: ' + error.message;
            this.showError('Erro nas alterações de variantes: ' + error.message);
        } finally {
            applyBtn.innerHTML = originalText;
            applyBtn.disabled = false;
            
            // Remove "Ver Detalhes" button after delay
            setTimeout(() => {
                this.removeVerDetalhesButton();
                this.currentOperation = null;
            }, 10000);
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

    showVariantValuesResults(data) {
        const modal = document.getElementById('results-modal');
        const content = document.getElementById('results-content');
        
        const updatedCount = data.updatedCount || 0;
        const failedCount = data.failedCount || 0;
        const totalProducts = data.totalProducts || 0;
        
        content.innerHTML = `
            <div class="mb-6">
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    <i class="fas fa-dollar-sign mr-2"></i>
                    Resultados da Atualização de Valores de Variantes
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
                                    <div class="text-xs text-gray-500">${result.changes}</div>
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

    showVariantMessage(message, type = 'info') {
        // Create or update message div within the variant modal
        let messageDiv = document.getElementById('variant-modal-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'variant-modal-message';
            
            // Insert after the modal header
            const modalContent = document.querySelector('#variant-titles-modal .bg-white');
            const header = modalContent.querySelector('.flex.justify-between.items-center');
            header.parentNode.insertBefore(messageDiv, header.nextSibling);
        }
        
        // Style based on type
        let bgColor, borderColor, textColor, icon;
        switch (type) {
            case 'error':
                bgColor = 'bg-red-50';
                borderColor = 'border-red-200';
                textColor = 'text-red-700';
                icon = 'fas fa-exclamation-circle';
                break;
            case 'success':
                bgColor = 'bg-green-50';
                borderColor = 'border-green-200';
                textColor = 'text-green-700';
                icon = 'fas fa-check-circle';
                break;
            case 'info':
            default:
                bgColor = 'bg-blue-50';
                borderColor = 'border-blue-200';
                textColor = 'text-blue-700';
                icon = 'fas fa-info-circle';
                break;
        }
        
        messageDiv.className = `mt-4 p-4 ${bgColor} border ${borderColor} rounded-lg ${textColor}`;
        messageDiv.innerHTML = `
            <div class="flex items-start">
                <i class="${icon} mt-0.5 mr-3"></i>
                <div class="flex-1">${message}</div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Auto-remove after 8 seconds for info messages
        if (type === 'info') {
            setTimeout(() => {
                if (messageDiv && messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 8000);
        }
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

    // === PROGRESS MODAL SYSTEM ===

    showProgressModal(title, operation) {
        this.currentOperation = operation;
        this.isProgressVisible = true;
        
        // CORREÇÃO: Não resetar progress data se já existe dados válidos
        if (!this.progressData || this.progressData.total === 0) {
            this.progressData = {
                analyzed: 0,
                updated: 0,
                failed: 0,
                unchanged: 0,
                total: 0,
                status: 'Preparando processamento...'
            };
        }
        
        // Update modal
        document.getElementById('progress-title').textContent = title;
        
        // CORREÇÃO: Remove event listeners antigos antes de adicionar novos
        this.removeProgressModalEventListeners();
        
        // Show modal
        const modal = document.getElementById('progress-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // CORREÇÃO: Adiciona event listeners frescos
        this.addProgressModalEventListeners();
        
        // Update display and start monitoring
        this.updateProgressDisplay();
        this.startProgressMonitoring();
    }

    hideProgressModal() {
        const modal = document.getElementById('progress-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        this.isProgressVisible = false;
        
        // Keep monitoring in background
        this.showNotification('Processamento continua em background. Use "Ver Detalhes" para acompanhar.', 'info');
    }

    closeProgressModal() {
        this.hideProgressModal();
        this.stopProgressMonitoring();
        // CORREÇÃO: Remove event listeners ao fechar
        this.removeProgressModalEventListeners();
    }

    addProgressModalEventListeners() {
        const closeBtn = document.getElementById('close-progress-modal');
        const cancelBtn = document.getElementById('cancel-progress');
        const hideBtn = document.getElementById('hide-progress');
        
        // CORREÇÃO: Cria handlers que podem ser referenciados para remoção
        this.progressModalHandlers = {
            close: () => this.closeProgressModal(),
            cancel: () => this.cancelProgress(),
            hide: () => this.hideProgressModal()
        };
        
        closeBtn.addEventListener('click', this.progressModalHandlers.close);
        cancelBtn.addEventListener('click', this.progressModalHandlers.cancel);
        hideBtn.addEventListener('click', this.progressModalHandlers.hide);
    }

    removeProgressModalEventListeners() {
        if (this.progressModalHandlers) {
            const closeBtn = document.getElementById('close-progress-modal');
            const cancelBtn = document.getElementById('cancel-progress');
            const hideBtn = document.getElementById('hide-progress');
            
            closeBtn?.removeEventListener('click', this.progressModalHandlers.close);
            cancelBtn?.removeEventListener('click', this.progressModalHandlers.cancel);
            hideBtn?.removeEventListener('click', this.progressModalHandlers.hide);
            
            this.progressModalHandlers = null;
        }
    }

    cancelProgress() {
        if (this.currentOperation) {
            // TODO: Implement actual cancellation logic
            this.showNotification('Cancelamento solicitado. Aguarde...', 'info');
            
            // For now, just close the modal
            this.closeProgressModal();
            this.currentOperation = null;
        }
    }

    updateProgressDisplay() {
        const { analyzed, updated, failed, unchanged, total, status } = this.progressData;
        
        // CORREÇÃO: Verifica se elementos existem antes de atualizar
        const elements = {
            analyzed: document.getElementById('progress-analyzed'),
            updated: document.getElementById('progress-updated'),
            failed: document.getElementById('progress-failed'),
            unchanged: document.getElementById('progress-unchanged'),
            bar: document.getElementById('progress-bar'),
            text: document.getElementById('progress-text'),
            status: document.getElementById('progress-status')
        };
        
        // Update counters with animation
        if (elements.analyzed) elements.analyzed.textContent = analyzed;
        if (elements.updated) elements.updated.textContent = updated;
        if (elements.failed) elements.failed.textContent = failed;
        if (elements.unchanged) elements.unchanged.textContent = unchanged;
        
        // CORREÇÃO: Atualização da barra de progresso mais precisa
        if (elements.bar && elements.text) {
            const processed = analyzed; // Use analyzed as the base for progress
            const percentage = total > 0 ? Math.round((processed / total) * 100) : 0;
            
            // Smooth animation for progress bar
            elements.bar.style.width = `${Math.min(percentage, 100)}%`;
            elements.text.textContent = `${processed}/${total}`;
            
            // Change bar color based on completion
            if (percentage >= 100) {
                elements.bar.className = elements.bar.className.replace('bg-green-500', 'bg-blue-500');
            }
        }
        
        // Update status with better formatting
        if (elements.status) {
            const icon = status.includes('concluído') ? 'fa-check-circle' : 
                        status.includes('Erro') ? 'fa-exclamation-circle' : 'fa-cogs';
            elements.status.innerHTML = `<i class="fas ${icon} mr-2"></i>${status}`;
        }
    }

    startProgressMonitoring() {
        // Clear any existing interval
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        // CORREÇÃO: Monitora progresso real e atualiza display mais frequentemente
        this.progressInterval = setInterval(() => {
            this.simulateProgressUpdate();
            
            // Update display even if modal is visible
            if (this.isProgressVisible) {
                this.updateProgressDisplay();
            }
        }, 800); // Slightly faster updates for smoother experience
    }

    stopProgressMonitoring() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    simulateProgressUpdate() {
        // CORREÇÃO: Atualização mais robusta do progresso
        if (this.isProgressVisible || this.currentOperation) {
            this.updateProgressDisplay();
        }
        
        // Check if processing is complete
        const processed = this.progressData.analyzed;
        if (processed >= this.progressData.total && this.progressData.total > 0) {
            this.stopProgressMonitoring();
            
            // CORREÇÃO: Auto-close apenas se explicitamente concluído
            if (this.isProgressVisible && this.progressData.status.includes('concluído')) {
                setTimeout(() => {
                    if (this.isProgressVisible) { // Check again in case user closed manually
                        this.closeProgressModal();
                        this.showNotification('Processamento concluído com sucesso!', 'success');
                    }
                }, 3000); // Reduced time for better UX
            }
        }
    }

    createVerDetalhesButton(targetButtonId) {
        // CORREÇÃO: Remove botão existente se houver
        this.removeVerDetalhesButton();
        
        const targetButton = document.getElementById(targetButtonId);
        if (!targetButton) return;
        
        // Create "Ver Detalhes" button
        const verDetalhesBtn = document.createElement('button');
        verDetalhesBtn.id = 'ver-detalhes-btn';
        verDetalhesBtn.type = 'button';
        verDetalhesBtn.className = 'ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors';
        verDetalhesBtn.innerHTML = '<i class="fas fa-chart-line mr-2"></i>Ver Detalhes';
        
        // CORREÇÃO: Armazena a referência do handler para remoção posterior
        this.verDetalhesHandler = () => {
            if (this.currentOperation) {
                this.showProgressModal(
                    this.getProgressTitle(this.currentOperation),
                    this.currentOperation
                );
            }
        };
        
        verDetalhesBtn.addEventListener('click', this.verDetalhesHandler);
        
        // Insert after target button
        targetButton.parentNode.insertBefore(verDetalhesBtn, targetButton.nextSibling);
    }

    removeVerDetalhesButton() {
        const btn = document.getElementById('ver-detalhes-btn');
        if (btn) {
            // CORREÇÃO: Remove o event listener antes de remover o botão
            if (this.verDetalhesHandler) {
                btn.removeEventListener('click', this.verDetalhesHandler);
                this.verDetalhesHandler = null;
            }
            btn.remove();
        }
    }

    getProgressTitle(operation) {
        switch (operation) {
            case 'bulk-edit':
                return 'Diagnóstico da Edição em Massa';
            case 'variant-titles':
                return 'Diagnóstico dos Títulos das Opções';
            case 'variant-values':
                return 'Diagnóstico dos Valores e Preços';
            case 'variant-titles-values':
                return 'Diagnóstico dos Títulos e Valores das Opções';
            default:
                return 'Diagnóstico do Processamento';
        }
    }

    // REAL-TIME: Poll operation progress using REAL Shopify API data
    async pollOperationProgress(operationId) {
        console.log(`🔄 Starting REAL-TIME progress polling with Shopify API for operation: ${operationId}`);
        
        return new Promise((resolve) => {
            const pollInterval = setInterval(async () => {
                try {
                    // Use the new endpoint that gets REAL data from Shopify API
                    const response = await fetch(`/api/real-progress/${operationId}?shop=${encodeURIComponent(this.shopName)}&accessToken=${encodeURIComponent(this.accessToken)}`);
                    const data = await response.json();
                    
                    if (!response.ok) {
                        console.error('❌ Real progress polling error:', data.error);
                        // Fallback to regular polling if real API fails
                        console.log('🔄 Falling back to regular progress polling...');
                        const fallbackResponse = await fetch(`/api/operation-progress/${operationId}`);
                        const fallbackData = await fallbackResponse.json();
                        
                        if (fallbackResponse.ok && fallbackData.success) {
                            this.updateProgressFromData(fallbackData.progress, operationId, 'fallback');
                        } else {
                            clearInterval(pollInterval);
                            resolve();
                        }
                        return;
                    }
                    
                    if (data.success && data.progress) {
                        const progress = data.progress;
                        const source = data.source || 'unknown';
                        
                        console.log(`📊 REAL Shopify API Progress update (${source}): ${progress.analyzed}/${progress.total} (${progress.percentage}%)`);
                        console.log(`📈 Shopify API shows: ${progress.updated} products actually updated`);
                        
                        this.updateProgressFromData(progress, operationId, source);
                        
                        // Check if operation is complete
                        if (progress.status && progress.status.includes('completed') || progress.isComplete) {
                            console.log(`✅ Operation ${operationId} completed with REAL Shopify data`);
                            clearInterval(pollInterval);
                            
                            // Clean up the operation from backend
                            fetch(`/api/operation-progress/${operationId}`, {
                                method: 'DELETE'
                            }).catch(err => console.log('Cleanup error:', err));
                            
                            resolve();
                            return;
                        }
                    }
                } catch (error) {
                    console.error('❌ Error polling real progress:', error);
                    // Continue polling even on errors - temporary network issues shouldn't stop progress tracking
                }
            }, 2000); // Poll every 2 seconds for real API data (less frequent to avoid rate limits)
            
            // Timeout after 8 minutes to prevent infinite polling
            setTimeout(() => {
                clearInterval(pollInterval);
                console.log(`⏰ Real progress polling timeout for operation: ${operationId}`);
                resolve();
            }, 480000); // 8 minutes timeout
        });
    }

    // Helper method to update progress data from API response
    updateProgressFromData(progress, operationId, source) {
        // CRITICAL: Update the progressData object that feeds the modal
        this.progressData.analyzed = progress.analyzed || 0;
        this.progressData.updated = progress.updated || 0;
        this.progressData.failed = progress.failed || 0;
        this.progressData.unchanged = progress.unchanged || 0;
        this.progressData.total = progress.total || 0;
        this.progressData.status = progress.status || 'Processando...';
        this.progressData.details = progress.details || [];
        
        // Add source indicator to status if from real API
        if (source === 'shopify-api') {
            this.progressData.status = `🔗 ${this.progressData.status} (Dados diretos da Shopify)`;
        } else if (source === 'fallback') {
            this.progressData.status = `⚠️ ${this.progressData.status} (Dados de fallback)`;
        }
        
        // CRITICAL: Force update the progress display immediately
        if (this.isProgressVisible) {
            this.updateProgressDisplay();
        }
        
        // Show recently updated products if available
        if (progress.recentlyUpdatedProducts && progress.recentlyUpdatedProducts.length > 0) {
            console.log(`📦 Recently updated products:`, progress.recentlyUpdatedProducts.map(p => `${p.title} (${p.updated_at})`));
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    try {
        new InfinityBulkManager();
    } catch (error) {
        console.error('Error initializing Infinity Bulk Manager:', error);
    }
});