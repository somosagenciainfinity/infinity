# 🚀 Guia de Deploy - Cloudflare Pages

## 📋 Problema Identificado e Solucionado

### ❌ **Erro Original**
```bash
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
```

**Causa**: Uso incorreto do comando `npx wrangler deploy` (Workers) em projeto Pages.

### ✅ **Solução Implementada**

## 🔧 Configurações Atualizadas

### 1. **wrangler.jsonc** - Configuração Corrigida
```json
{
  "name": "infinity-bulk-manager",
  "compatibility_date": "2025-08-15",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"]
}
```

### 2. **package.json** - Scripts de Deploy
```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && wrangler pages deploy dist",
    "deploy:prod": "npm run build && wrangler pages deploy dist --project-name infinity-bulk-manager"
  }
}
```

## 🎯 **Deploy no Cloudflare Pages**

### **Método 1: Deploy Automático via Git (Recomendado)**

1. **Conectar Repositório**
   - Acesse [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Clique em "Create a project"
   - Conecte ao GitHub: `https://github.com/somosagenciainfinity/infinity`

2. **Configurações de Build**
   ```yaml
   Project name: infinity-bulk-manager
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

3. **Variáveis de Ambiente (opcional)**
   ```yaml
   NODE_VERSION: 18
   NPM_VERSION: 10
   ```

### **Método 2: Deploy Manual via CLI**

```bash
# Build local
npm run build

# Deploy direto
npm run deploy

# Ou para produção específica
npm run deploy:prod
```

## 📁 Estrutura de Build

```
dist/
├── _worker.js          # Cloudflare Pages Function
├── _routes.json        # Configuração de rotas
└── static/            # Arquivos estáticos (se houver)
```

## 🔍 Verificação de Deploy

### **Comandos de Teste**
```bash
# Verificar build
npm run build

# Testar localmente com Wrangler
npm run preview

# Verificar status do projeto
npx wrangler pages project list
```

### **URLs Resultantes**
- **Produção**: `https://infinity-bulk-manager.pages.dev`
- **Preview**: URLs automáticas para branches e PRs

## 🛠️ Troubleshooting

### **Erro: "Workers-specific command in Pages project"**
```bash
# ❌ ERRADO
npx wrangler deploy

# ✅ CORRETO
npx wrangler pages deploy dist
# ou
npm run deploy
```

### **Erro: Build falha**
```bash
# Limpar cache e rebuildar
rm -rf dist node_modules
npm install
npm run build
```

### **Erro: Projeto não encontrado**
```bash
# Verificar projetos existentes
npx wrangler pages project list

# Criar projeto se necessário
npx wrangler pages project create infinity-bulk-manager
```

## 📊 Monitoramento

### **Logs de Deploy**
- Acessar via Cloudflare Dashboard > Pages > infinity-bulk-manager > Deployments

### **Métricas e Analytics**
- Analytics disponível no painel do Cloudflare Pages
- Core Web Vitals automático
- Estatísticas de tráfego global

## 🔒 Configurações de Produção

### **Domínio Personalizado (opcional)**
```bash
# Adicionar domínio via painel ou CLI
npx wrangler pages domain add infinity-bulk-manager.com
```

### **Headers de Segurança**
Adicionar em `_headers` (se necessário):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### **Redirects**
Adicionar em `_redirects` (se necessário):
```
/old-path /new-path 301
```

## ✅ Checklist de Deploy

- [x] **Configuração wrangler.jsonc atualizada**
- [x] **Scripts de deploy configurados no package.json**
- [x] **Build testado e funcionando**
- [x] **Código commitado no repositório**
- [ ] **Projeto criado no Cloudflare Pages**
- [ ] **Repositório GitHub conectado**
- [ ] **Primeiro deploy executado**
- [ ] **URL de produção testada**

## 🎯 Comandos Rápidos

```bash
# Deploy completo
npm run deploy:prod

# Apenas build
npm run build

# Preview local
npm run preview

# Status do projeto
npx wrangler pages project list
```

---

**✨ Deploy configurado corretamente para Cloudflare Pages!**

**Repositório**: https://github.com/somosagenciainfinity/infinity  
**Tech Stack**: Hono + TypeScript + Vite + Cloudflare Pages  
**Build Output**: `dist/` directory com Pages Functions