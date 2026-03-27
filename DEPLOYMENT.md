# Cloudflare Pages 部署指南

## 已完成配置

### 1. GitHub Actions 工作流
已创建 `.github/workflows/deploy.yml`，包含：
- 自动构建和部署到 Cloudflare Pages
- 支持 main 分支推送和 PR 触发
- 支持手动触发部署

### 2. Cloudflare Pages 配置
已创建 `cloudflare.json`，包含：
- 构建命令：`next build`
- 输出目录：`.next`
- Node.js 版本：18
- 框架预设：Next.js

### 3. 项目配置
- Next.js 14.2.25
- React 18
- TypeScript 5.7.3
- Tailwind CSS 3.4.17

## 需要完成的步骤

### 步骤 1：设置 GitHub Secrets
在 GitHub 仓库设置中添加以下 Secrets：

1. **CLOUDFLARE_API_TOKEN**
   - 获取方式：Cloudflare Dashboard → My Profile → API Tokens
   - 权限：Edit Cloudflare Pages
   - 格式：`cfat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. **CLOUDFLARE_ACCOUNT_ID**
   - 获取方式：Cloudflare Dashboard 左下角
   - 格式：`fdf3c7cdfb1c56f60ad2b9caac2254ad`

3. **GITHUB_TOKEN**（自动提供，无需手动设置）

### 步骤 2：通过 Cloudflare Dashboard 连接 GitHub
1. 访问 [Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. 点击 **Create application** → **Pages**
3. 点击 **Connect to Git**
4. 选择 **GitHub** 并授权访问
5. 选择仓库：**sssong78/m3u8-player**
6. 点击 **Begin setup**

### 步骤 3：配置项目设置
在 Cloudflare Pages 设置中：

1. **项目名称**: m3u8-player
2. **生产分支**: main
3. **构建设置**:
   - Framework preset: Next.js
   - Build command: `next build`
   - Build output directory: `.next`
   - Root directory: `/`

4. **环境变量**（可选）:
   - `NODE_VERSION`: `18`
   - `NEXT_TELEMETRY_DISABLED`: `1`

### 步骤 4：首次部署
1. 点击 **Save and Deploy**
2. 等待构建完成（约 2-5 分钟）
3. 部署成功后，访问：`https://m3u8-player.pages.dev`

## 自动化流程

### 触发条件
- **推送代码到 main 分支**：自动触发部署
- **创建 Pull Request 到 main**：创建预览部署
- **手动触发**：在 GitHub Actions 页面手动运行工作流

### 部署 URL
- **生产环境**: https://m3u8-player.pages.dev
- **预览环境**: https://<branch-name>--m3u8-player.pages.dev

## 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 本地测试构建
   npm run build
   ```

2. **GitHub Actions 失败**
   - 检查 Secrets 是否正确设置
   - 查看 Actions 日志获取详细错误信息

3. **部署后 404**
   - 确认输出目录为 `.next`
   - 检查 `next.config.js` 配置

4. **环境变量问题**
   - 在 Cloudflare Pages 项目设置中添加环境变量
   - 重启部署使变量生效

## 监控和管理

### Cloudflare Dashboard
- **构建日志**: 项目 → Deployments → 点击部署查看
- **分析**: 项目 → Analytics 查看访问统计
- **环境变量**: 项目 → Settings → Environment variables

### GitHub Actions
- **工作流状态**: https://github.com/sssong78/m3u8-player/actions
- **部署历史**: Actions 页面查看所有部署记录

## 快速链接

- **Cloudflare Pages**: https://dash.cloudflare.com/?to=/:account/pages
- **GitHub Actions**: https://github.com/sssong78/m3u8-player/actions
- **生产站点**: https://m3u8-player.pages.dev
- **GitHub 仓库**: https://github.com/sssong78/m3u8-player

## 后续步骤

1. **自定义域名**（可选）:
   - 在 Cloudflare Pages 设置中添加自定义域名
   - 配置 DNS 记录

2. **添加更多环境变量**:
   - API 端点
   - 第三方服务密钥
   - 功能开关

3. **设置监控**:
   - 错误跟踪
   - 性能监控
   - 访问分析

---

**最后更新**: 2026-03-27  
**状态**: 等待通过 Cloudflare Dashboard 完成 GitHub 集成