# Docker 部署指南

## 📦 Docker 镜像构建

### 本地构建和测试

```bash
# 构建镜像
docker build -t it-learning-platform .

# 运行容器
docker run -p 3000:3000 it-learning-platform

# 或使用 docker-compose
docker-compose up -d
```

## 🚀 服务器部署

### 方式1：直接 Docker 部署

```bash
# 1. 拉取代码
git clone https://github.com/2499659968/it-learning-platform.git
cd it-learning-platform

# 2. 构建镜像
docker build -t it-learning-platform:latest .

# 3. 运行容器
docker run -d \
  --name it-learning-app \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  --restart unless-stopped \
  it-learning-platform:latest

# 4. 查看日志
docker logs -f it-learning-app
```

### 方式2：使用 docker-compose

```bash
# 1. 拉取代码
git clone https://github.com/2499659968/it-learning-platform.git
cd it-learning-platform

# 2. 设置环境变量（可选）
export NEXT_PUBLIC_SITE_URL=https://your-domain.com

# 3. 启动服务
docker-compose up -d

# 4. 查看状态
docker-compose ps

# 5. 查看日志
docker-compose logs -f
```

## 🔄 更新部署

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 重新构建并启动
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🔧 环境变量配置

创建 `.env.production` 文件（服务器上）：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
```

## 🌐 Nginx 反向代理配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📊 监控和维护

```bash
# 查看容器状态
docker ps

# 查看资源占用
docker stats it-learning-app

# 重启容器
docker restart it-learning-app

# 停止容器
docker stop it-learning-app

# 删除容器
docker rm it-learning-app
```

## 🔒 HTTPS 配置（使用 Certbot）

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

## 📝 常见问题

### 端口被占用
```bash
# 查看端口占用
lsof -i :3000

# 修改端口（docker-compose.yml）
ports:
  - "8080:3000"
```

### 内存不足
```bash
# 限制容器内存
docker run -d \
  --name it-learning-app \
  -p 3000:3000 \
  -m 512m \
  it-learning-platform:latest
```

## 🎯 生产环境检查清单

- [ ] 设置正确的 NEXT_PUBLIC_SITE_URL
- [ ] 配置 Nginx 反向代理
- [ ] 启用 HTTPS
- [ ] 配置防火墙规则
- [ ] 设置容器自动重启
- [ ] 配置日志轮转
- [ ] 设置监控告警

## 📈 性能优化

```bash
# 启用 Docker BuildKit
export DOCKER_BUILDKIT=1

# 多阶段构建优化（已在 Dockerfile 中配置）

# 使用 Docker 层缓存
docker build --cache-from it-learning-platform:latest -t it-learning-platform:latest .
```

## 🔗 相关链接

- GitHub 仓库: https://github.com/2499659968/it-learning-platform
- Next.js Docker 文档: https://nextjs.org/docs/deployment#docker-image
