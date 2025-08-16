#!/bin/bash

# Script para atualização com pré-visualização automática
# Uso: ./dev-update.sh "mensagem do commit"

echo "🔄 Iniciando processo de atualização..."

# 1. Build do projeto
echo "📦 Fazendo build do projeto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build!"
    exit 1
fi

# 2. Restart do PM2 para recarregar as mudanças
echo "🔄 Reiniciando servidor de desenvolvimento..."
pm2 restart infinity-bulk-manager

# 3. Aguardar um momento para o servidor inicializar
sleep 2

# 4. Verificar status
echo "✅ Status do servidor:"
pm2 status infinity-bulk-manager

# 5. Mostrar URL de acesso
echo ""
echo "🌐 Aplicação disponível em:"
echo "   https://3000-ioikgdl1o5btpcryl4tdn-6532622b.e2b.dev"
echo ""

# 6. Se foi passada uma mensagem de commit, fazer commit
if [ ! -z "$1" ]; then
    echo "📝 Fazendo commit das alterações..."
    git add .
    git commit -m "$1"
    echo "✅ Commit realizado: $1"
fi

echo "🎉 Atualização concluída! Você pode acessar a aplicação no link acima."