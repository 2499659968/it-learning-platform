# 开发环境 vs 生产环境配置指南

## 📚 统一配置策略

本项目已配置好开发和生产环境的统一管理，避免上线后大量修改。

## 🗂️ 关键文件说明

### 1. **环境变量文件**

| 文件 | 用途 | 是否提交 Git |
|------|------|------------|
| `.env.local` | 本地开发环境变量 | ❌ 不提交 |
| `.env.production.example` | 生产环境变量示例 | ✅ 提交 |

**使用方法：**
```bash
# 开发环境自动读取 .env.local
npm run dev

# 生产环境在部署平台设置环境变量
```

### 2. **配置文件 `config/site.ts`**

**核心功能：**
- 统一管理网站信息（名称、描述、URL）
- 自动适配开发/生产环境的 URL
- 功能开关（认证、评论、分析等）
- API 端点集中管理

**使用示例：**
```typescript
import { siteConfig } from "@/config/site";

// 自动适配环境
console.log(siteConfig.url); 
// 开发: http://localhost:9527
// 生产: https://your-domain.com
```

### 3. **Next.js 配置 `next.config.ts`**

已配置：
- ✅ 图片优化
- ✅ 安全 Headers
- ✅ 压缩优化
- ✅ 重定向配置

### 4. **工具函数 `lib/utils.ts`**

提供统一的 URL 处理函数，自动适配环境：
```typescript
import { getAbsoluteUrl } from "@/lib/utils";

// 自动生成完整 URL
const shareUrl = getAbsoluteUrl("/learn/javascript");
// 开发: http://localhost:9527/learn/javascript
// 生产: https://your-domain.com/learn/javascript
```

## 🚀 部署流程

### 步骤 1：更新生产配置

编辑 `config/site.ts`：
```typescript
export const siteConfig = {
  name: "你的网站名称",
  description: "你的网站描述",
  // url 会自动从环境变量读取，无需修改
  
  contact: {
    email: "your-email@example.com",
    github: "https://github.com/yourusername",
  },
};
```

### 步骤 2：设置环境变量

在 Vercel/服务器设置：
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

### 步骤 3：部署

```bash
# 本地测试构建
npm run build
npm start

# 部署到 Vercel
vercel --prod
```

## ✅ 最佳实践

### 1. **永远不要硬编码 URL**

❌ 错误：
```typescript
const url = "http://localhost:9527/api/courses";
```

✅ 正确：
```typescript
import { getApiUrl } from "@/lib/utils";
const url = getApiUrl("/courses");
```

### 2. **使用环境变量存储敏感信息**

❌ 错误：
```typescript
const apiKey = "sk-1234567890abcdef";
```

✅ 正确：
```typescript
const apiKey = process.env.OPENAI_API_KEY;
```

### 3. **功能开关控制**

使用 `config/site.ts` 中的 `features` 开关：
```typescript
import { siteConfig } from "@/config/site";

if (siteConfig.features.enableAuth) {
  // 显示登录功能
}
```

### 4. **图片使用相对路径**

```typescript
import Image from "next/image";

// ✅ 正确 - 相对路径
<Image src="/images/logo.png" alt="Logo" />

// ✅ 正确 - 使用 Next.js Image 组件
<Image src="https://example.com/image.jpg" alt="..." />
```

## 🔍 检查清单

部署前运行这些命令确保没有问题：

```bash
# 1. 类型检查
npx tsc --noEmit

# 2. 代码规范检查
npm run lint

# 3. 构建测试
npm run build

# 4. 启动生产模式测试
npm start
```

## 📝 常见问题

### Q: 如何添加新的环境变量？

1. 在 `.env.local` 添加（开发环境）
2. 在 `.env.production.example` 添加（记录给团队）
3. 在部署平台设置（生产环境）
4. 如果是客户端变量，必须以 `NEXT_PUBLIC_` 开头

### Q: URL 在开发和生产环境如何自动切换？

使用 `config/site.ts` 中的配置，它会自动从环境变量读取：
```typescript
url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:9527"
```

### Q: 如何区分开发和生产环境执行不同逻辑？

```typescript
import { isDev, isProd } from "@/config/site";

if (isDev) {
  console.log("开发环境 - 显示调试信息");
}

if (isProd) {
  // 启用分析追踪
}
```

## 🎯 总结

✅ **已配置好的内容：**
- 环境变量管理
- 统一配置文件
- SEO 优化
- 安全 Headers
- Sitemap 自动生成
- 工具函数封装

✅ **你只需要做的：**
1. 更新 `config/site.ts` 的网站信息
2. 在部署平台设置环境变量
3. 部署

**无需在代码中硬编码任何 URL 或配置！**
