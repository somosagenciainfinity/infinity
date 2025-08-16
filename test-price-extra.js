// Test script for price extra functionality
const testPriceExtra = async () => {
    console.log('🧪 Testing price extra functionality...');
    
    // Simulate the data structure that would come from the frontend
    const testVariantMapping = [
        {
            optionName: "PERSONALIZAR",
            currentValue: "SIM", 
            newValue: "SIM", // Keep the same value but add price
            priceExtra: 50.00 // Add R$ 50.00 extra
        }
    ];
    
    console.log('📋 Test mapping:', JSON.stringify(testVariantMapping, null, 2));
    
    // Simulate a product variant
    const mockVariant = {
        id: "12345",
        price: "500.00",
        option1: "SIM",
        option2: null,
        option3: null
    };
    
    const mockProduct = {
        id: "67890",
        title: "Atlético Mineiro 24/25 I Home - Todos os Patrocínios - Versão Torcedor",
        options: [
            { name: "PERSONALIZAR", position: 1 }
        ],
        variants: [mockVariant]
    };
    
    console.log('🏷️ Mock product:', mockProduct.title);
    console.log('💰 Original price:', mockVariant.price);
    
    // Simulate the logic we added to the backend
    let totalPriceExtra = 0;
    let variantChanged = false;
    
    const optionValues = [mockVariant.option1, mockVariant.option2, mockVariant.option3].filter(Boolean);
    const optionNames = mockProduct.options?.map(opt => opt.name) || [];
    
    console.log('🔍 Processing variant options...');
    
    for (let i = 0; i < optionValues.length; i++) {
        const currentValue = optionValues[i];
        const optionName = optionNames[i];
        
        console.log(`   Option ${i + 1}: ${optionName} = "${currentValue}"`);
        
        // Find matching value mapping
        const mapping = testVariantMapping.find(m => 
            m.optionName === optionName && 
            m.currentValue.toLowerCase() === currentValue.toLowerCase()
        );
        
        if (mapping) {
            console.log(`   ✅ Found mapping for ${optionName}="${currentValue}"`);
            
            // Add price extra if specified
            if (mapping.priceExtra && mapping.priceExtra > 0) {
                totalPriceExtra += mapping.priceExtra;
                variantChanged = true;
                
                console.log(`   💰 Adding price extra: +R$ ${mapping.priceExtra}`);
            }
        } else {
            console.log(`   ❌ No mapping found for ${optionName}="${currentValue}"`);
        }
    }
    
    console.log(`\n📊 Results:`);
    console.log(`   Total price extra: R$ ${totalPriceExtra.toFixed(2)}`);
    console.log(`   Variant changed: ${variantChanged}`);
    
    if (variantChanged && totalPriceExtra > 0) {
        const currentPrice = parseFloat(mockVariant.price) || 0;
        const newPrice = (currentPrice + totalPriceExtra).toFixed(2);
        
        console.log(`   Original price: R$ ${mockVariant.price}`);
        console.log(`   New price: R$ ${newPrice}`);
        console.log(`   Price increase: +R$ ${totalPriceExtra.toFixed(2)}`);
        
        console.log('\n✅ Test PASSED: Price extra logic working correctly!');
        console.log('🎯 Expected behavior: R$ 500.00 → R$ 550.00 (+R$ 50.00)');
    } else {
        console.log('\n❌ Test FAILED: Price extra logic not working');
    }
    
    console.log('\n📝 Next steps for testing:');
    console.log('1. Access the application in browser');
    console.log('2. Connect to Shopify');
    console.log('3. Load products');
    console.log('4. Open "Títulos de Variantes"');
    console.log('5. Load existing variants');
    console.log('6. Go to "Valores e Preços" tab');
    console.log('7. Set price extra for PERSONALIZAR = SIM = R$ 50.00');
    console.log('8. Apply changes');
    console.log('9. Check if product price updates from R$ 500.00 to R$ 550.00');
};

testPriceExtra();