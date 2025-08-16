# 🚀 Guia de Desenvolvimento - Infinity Bulk Manager

## 🌐 URL da Aplicação
**Pré-visualização Ativa**: https://3000-ioikgdl1o5btpcryl4tdn-6532622b.e2b.dev

## 📋 Comandos Essenciais

### Atualização Rápida com Pré-visualização
```bash
# Atualizar e ver mudanças imediatamente
./dev-update.sh "descrição das mudanças"

# Ou sem commit automático:
./dev-update.sh
```

### Comandos Manuais
```bash
# Build do projeto
npm run build

# Reiniciar servidor
pm2 restart infinity-bulk-manager

# Ver status do servidor
pm2 status

# Ver logs (sem bloquear terminal)
pm2 logs --nostream

# Parar servidor
pm2 stop infinity-bulk-manager
```

## 🔄 Fluxo de Desenvolvimento

### 1. Fazer Alterações
- Edite arquivos em `src/` para backend (TypeScript/Hono)
- Edite arquivos em `public/` para frontend (HTML/CSS/JS)

### 2. Testar Mudanças
```bash
./dev-update.sh "descrição da mudança"
```

### 3. Acessar Pré-visualização
- Acesse: https://3000-ioikgdl1o5btpcryl4tdn-6532622b.e2b.dev
- As mudanças estarão visíveis imediatamente

### 4. Commit e Push (quando satisfeito)
```bash
git push origin main
```

## 📁 Estrutura do Projeto

```
/home/user/webapp/
├── src/                    # Backend (Hono + TypeScript)
│   ├── index.ts           # Ponto de entrada do servidor
│   └── ...
├── public/                # Frontend (HTML + CSS + JS)
│   ├── index.html        # Interface principal
│   ├── style.css         # Estilos
│   └── script.js         # JavaScript frontend
├── dist/                  # Build final (gerado automaticamente)
└── dev-update.sh         # Script de atualização rápida
```

## 🛠️ Principais Funcionalidades Implementadas

✅ **Sistema de Conexão Shopify**
✅ **Paginação Completa de Produtos (3000+)**
✅ **Sistema de Coleções com Fallback**
✅ **Interface Avançada com Checkboxes e Clique em Linha**
✅ **Edição em Massa Expandida (todos os campos)**
✅ **Gerenciamento de Variantes (Títulos)**
✅ **Rate Limiting para Proteção da API**
✅ **Design Responsivo com TailwindCSS**

## 🔧 Modificações Comuns

### Adicionar Nova Funcionalidade Backend
1. Edite `src/index.ts`
2. Execute `./dev-update.sh "nova funcionalidade backend"`
3. Teste na URL de pré-visualização

### Modificar Interface Frontend
1. Edite `public/index.html`, `public/style.css` ou `public/script.js`
2. Execute `./dev-update.sh "mudança na interface"`
3. Recarregue a página da pré-visualização

### Alterar Estilos
1. Edite classes TailwindCSS em `public/index.html`
2. Execute `./dev-update.sh "ajuste visual"`
3. Veja mudanças imediatamente

## 🚨 Troubleshooting

### Servidor não responde
```bash
pm2 restart infinity-bulk-manager
pm2 status
```

### Build falha
```bash
npm run build
# Verifique erros de TypeScript
```

### Porta já em uso
```bash
pm2 stop infinity-bulk-manager
pm2 start ecosystem.config.cjs
```

## 📝 Notas Importantes

- ⚡ **Hot Reload**: Use `./dev-update.sh` para ver mudanças imediatamente
- 🔄 **Build Automático**: O script faz build automaticamente
- 📊 **PM2 Management**: Servidor roda em background com PM2
- 🌐 **URL Fixa**: A URL de pré-visualização permanece a mesma durante desenvolvimento
- 📦 **Sem Bloqueio**: Comandos não bloqueiam o terminal

---
**Desenvolvido para máxima produtividade em desenvolvimento! 🚀**