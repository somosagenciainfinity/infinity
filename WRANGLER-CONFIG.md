# 🔧 Configuração Wrangler - Infinity Bulk Manager

## 📋 **Arquivos de Configuração Atualizados**

### **wrangler.toml** - Configuração Principal
```toml
name = "infinity-bulk-manager"
compatibility_date = "2025-08-15"
pages_build_output_dir = "dist"
compatibility_flags = ["nodejs_compat"]
node_compat = true

[observability.logs]
enabled = true
level = "info"

[env.production]
name = "infinity-bulk-manager"

[env.preview]  
name = "infinity-bulk-manager-preview"
```

### **Novos Scripts NPM Disponíveis**

#### **🚀 Scripts de Deploy**
```bash
# Deploy completo em produção
npm run deploy:prod

# Deploy em preview/staging
npm run deploy:preview

# Deploy básico
npm run deploy

# Deploy completo com verificação
npm run full-deploy
```

#### **🔨 Scripts de Build**
```bash
# Build com verificação
npm run build:check

# Build padrão
npm run build

# Limpeza completa
npm run clean
```

#### **🧪 Scripts de Teste**
```bash
# Testar preview local
npm run preview

# Preview com IP público (sandbox)
npm run preview:remote

# Teste completo (build + preview)
npm run test:build
```

#### **⚙️ Scripts de Wrangler**
```bash
# Login no Cloudflare
npm run wrangler:login

# Verificar usuário logado
npm run wrangler:whoami

# Listar projetos Pages
npm run deploy:check
```

## 🎯 **Configurações Implementadas**

### **1. Observabilidade Habilitada**
- ✅ Logs detalhados ativados
- ✅ Métricas de performance
- ✅ Debugging melhorado

### **2. Ambientes Separados**
- ✅ **Produção**: `infinity-bulk-manager`
- ✅ **Preview**: `infinity-bulk-manager-preview`

### **3. Headers de Segurança** (`public/_headers`)
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ CORS configurado para APIs
- ✅ Cache otimizado para assets

### **4. Build Otimizado** (`vite.config.ts`)
- ✅ Target: esnext (máxima performance)
- ✅ Minificação: esbuild (mais rápido)
- ✅ Chunks otimizados

### **5. Redirecionamentos** (`public/_redirects`)
- ✅ SPA routing configurado
- ✅ Fallback para index.html

## 📝 **Instruções de Deploy**

### **Deploy Automático (Recomendado)**
1. **Painel Cloudflare Pages**: [dash.cloudflare.com/pages](https://dash.cloudflare.com/pages)
2. **Conectar repositório**: `https://github.com/somosagenciainfinity/infinity`
3. **Configurações**:
   ```yaml
   Project name: infinity-bulk-manager
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

### **Deploy Manual**
```bash
# Produção
npm run deploy:prod

# Preview/Staging
npm run deploy:preview

# Deploy completo com verificações
npm run full-deploy
```

## 🔍 **Verificação de Configuração**

### **Comandos de Diagnóstico**
```bash
# Verificar projetos existentes
npm run deploy:check

# Testar build local
npm run build:check

# Verificar usuário
npm run wrangler:whoami

# Preview local
npm run preview
```

### **URLs Esperadas**
- **Produção**: `https://infinity-bulk-manager.pages.dev`
- **Preview**: `https://infinity-bulk-manager-preview.pages.dev`
- **Custom Domains**: Configuráveis no painel

## ⚠️ **Troubleshooting**

### **Erro: "Workers-specific command"**
```bash
# ❌ ERRADO
npx wrangler deploy

# ✅ CORRETO  
npm run deploy:prod
```

### **Erro: "Project not found"**
```bash
# Verificar projetos
npm run deploy:check

# Login se necessário
npm run wrangler:login
```

### **Build falha**
```bash
# Limpar e rebuildar
npm run clean
npm install
npm run build:check
```

## 🎯 **Principais Melhorias**

### **✅ Configuração Consistente**
- Todos os ambientes usam as mesmas configurações base
- Variáveis de ambiente separadas por ambiente
- Observabilidade habilitada em todos os ambientes

### **✅ Scripts Otimizados**
- Deploy automatizado com verificações
- Builds otimizados para performance
- Comandos de diagnóstico integrados

### **✅ Segurança Melhorada**
- Headers de segurança configurados
- CORS otimizado para APIs Shopify
- Cache configurado adequadamente

### **✅ Developer Experience**
- Scripts intuitivos e organizados
- Comandos de verificação automática
- Preview local otimizado

---

**🎉 Configuração completa e consistente para todas as implantações!**

**Compatível com Wrangler v3.88.0+ e otimizado para Cloudflare Pages**