# 部署前检查清单

## 📋 部署到生产环境前必须完成的事项

### 1. 环境变量配置

在部署平台（Vercel/服务器）设置以下环境变量：

- [ ] `NEXT_PUBLIC_SITE_URL` - 你的域名（如 https://your-domain.com）
- [ ] `NEXT_PUBLIC_API_URL` - API 地址（如果有后端）
- [ ] `NODE_ENV=production`

**参考 `.env.production.example` 文件**

### 2. SEO 优化

- [ ] 在 `config/site.ts` 中更新网站信息
- [ ] 准备 Open Graph 图片（1200x630px）放到 `/public/og-image.png`
- [ ] 创建 `/public/apple-touch-icon.png`（180x180px）
- [ ] 添加 `/public/robots.txt`
- [ ] 添加 `/public/sitemap.xml`

### 3. 安全检查

- [ ] 确保敏感信息不在代码中（使用环境变量）
- [ ] 检查 `.gitignore` 包含 `.env.local`
- [ ] 更新 `next.config.ts` 中的 `images.remotePatterns`

### 4. 部署

#### Vercel 部署（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

## 🚀 快速部署命令

```bash
# 1. 检查构建
npm run build

# 2. 本地测试生产构建
npm start

# 3. 推送到 Git
git add .
git commit -m "Ready for production"
git push
```
