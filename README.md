# IT 学习平台

一个使用 Next.js 15 构建的现代化编程学习平台。

## ✨ 特性

- 📚 **课程系统** - JavaScript、TypeScript、React、Next.js 等课程
- 🎨 **现代化 UI** - Tailwind CSS + 响应式设计
- 🌓 **深色模式** - 自动适配系统主题
- ⚡ **高性能** - Next.js 15 + Turbopack
- 🔍 **SEO 友好** - 内置 SEO 优化和 sitemap
- 🚀 **生产就绪** - 开发/生产环境统一配置

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
# 启动开发服务器（端口 9527）
PORT=9527 npm run dev
```

访问 [http://localhost:9527](http://localhost:9527)

### 生产构建

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
it-learning-app/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页（课程列表）
│   ├── learn/[courseId]/  # 课程详情页
│   ├── layout.tsx         # 根布局
│   ├── sitemap.ts         # 动态 sitemap
│   └── globals.css        # 全局样式
├── config/
│   └── site.ts            # 网站配置（统一管理）
├── lib/
│   └── utils.ts           # 工具函数
├── public/                # 静态资源
├── .env.local             # 本地环境变量（不提交 Git）
├── .env.production.example # 生产环境变量示例
└── next.config.ts         # Next.js 配置
```

## ⚙️ 环境配置

### 开发环境

创建 `.env.local` 文件（已自动生成）：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:9527
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development
```

### 生产环境

在部署平台（如 Vercel）设置环境变量：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NODE_ENV=production
```

**详细说明见 [ENVIRONMENT.md](./ENVIRONMENT.md)**

## 🎯 核心功能

### 1. 统一配置管理 (`config/site.ts`)

所有网站配置集中管理，自动适配开发/生产环境。

### 2. 工具函数 (`lib/utils.ts`)

提供统一的 URL 处理，自动适配环境。

### 3. SEO 优化

- ✅ 动态 sitemap
- ✅ Meta 标签
- ✅ Open Graph（社交分享）
- ✅ robots.txt

## 📦 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel（推荐）

## 🚢 部署

### Vercel 部署（推荐）

```bash
npm i -g vercel
vercel --prod
```

**详细部署指南见 [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 📝 开发指南

### 使用环境变量

```typescript
// ✅ 正确 - 使用配置
import { getApiUrl } from "@/lib/utils";
const url = getApiUrl("/courses");
```

## 🔧 常用命令

```bash
# 开发
PORT=9527 npm run dev

# 构建
npm run build

# 生产模式
npm start

# 代码检查
npm run lint
```

## 📄 文档

- [环境配置指南](./ENVIRONMENT.md) - 开发/生产环境配置详解
- [部署检查清单](./DEPLOYMENT.md) - 上线前必看

---

**开始学习编程之旅！** 🎓
