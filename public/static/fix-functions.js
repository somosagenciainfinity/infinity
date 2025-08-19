// FIX FUNCTIONS - Garantir que funcionalidades não sejam bloqueadas
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Fix Functions loaded');
    
    // Garantir que campos de conexão funcionem
    const shopName = document.getElementById('shop-name');
    const accessToken = document.getElementById('access-token');
    const connectBtn = document.getElementById('connect-btn');
    
    if (shopName) {
        shopName.removeAttribute('disabled');
        shopName.style.pointerEvents = 'auto';
        shopName.style.userSelect = 'text';
    }
    
    if (accessToken) {
        accessToken.removeAttribute('disabled');
        accessToken.style.pointerEvents = 'auto';
        accessToken.style.userSelect = 'text';
    }
    
    if (connectBtn) {
        connectBtn.style.pointerEvents = 'auto';
        connectBtn.style.cursor = 'pointer';
    }
    
    // Garantir que todos os botões funcionem
    document.querySelectorAll('button').forEach(btn => {
        btn.style.pointerEvents = 'auto';
        btn.style.cursor = 'pointer';
    });
    
    // Remover qualquer bloqueio em elementos visíveis
    document.querySelectorAll('*:not(.hidden)').forEach(el => {
        if (el.tagName === 'BUTTON' || el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
            el.style.pointerEvents = 'auto';
        }
    });
});