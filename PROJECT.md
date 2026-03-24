# M3U8 Player 项目管理文档

## 项目信息
- **项目名称**: M3U8 Player
- **GitHub 仓库**: https://github.com/sssong78/m3u8-player
- **本地路径**: `/root/.openclaw/workspace/projects/m3u8-player/`
- **项目类型**: Next.js Web 应用
- **状态**: 开发中

## 快速开始

### 环境设置
```bash
# 进入项目目录
cd /root/.openclaw/workspace/projects/m3u8-player

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问应用
open http://localhost:3000
```

### Git 操作
```bash
# 查看状态
git status

# 添加更改
git add .

# 提交更改
git commit -m "描述更改内容"

# 推送到 GitHub
git push origin main

# 拉取最新代码
git pull origin main
```

## 项目结构说明

### 主要目录
- `app/` - Next.js 14 App Router 目录
- `components/` - React 组件
- `lib/` - 工具函数和状态管理
- `public/` - 静态资源
- `docs/` - 项目文档（建议创建）

### 重要文件
- `requirements.md` - 项目需求文档
- `README.md` - 项目说明文档
- `package.json` - 项目配置和依赖
- `next.config.js` - Next.js 配置
- `tailwind.config.ts` - Tailwind CSS 配置

## 开发工作流

### 1. 功能开发
1. 从 `main` 分支创建新分支
2. 实现功能
3. 测试功能
4. 提交更改

### 2. 代码审查
1. 创建 Pull Request
2. 代码审查
3. 合并到 `main` 分支

### 3. 部署
1. 自动部署到 Vercel
2. 测试生产环境
3. 监控和反馈

## 常用命令

### 开发命令
```bash
# 开发模式
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

### Git 命令
```bash
# 查看远程仓库
git remote -v

# 查看分支
git branch -a

# 创建新分支
git checkout -b feature/new-feature

# 合并分支
git merge feature/new-feature
```

## 配置说明

### 环境变量
创建 `.env.local` 文件：
```env
# 开发环境配置
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 生产环境配置（在 Vercel 中设置）
# NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 编辑器配置
建议使用 VS Code 并安装以下扩展：
- TypeScript 和 JavaScript 语言功能
- Tailwind CSS IntelliSense
- ESLint
- Prettier

## 文档维护

### 更新文档
1. 修改相关文档文件
2. 提交更改
3. 推送到 GitHub

### 文档结构
- `requirements.md` - 需求规格
- `PROJECT.md` - 项目管理（本文件）
- `API.md` - API 文档（如果需要）
- `DEPLOY.md` - 部署指南

## 问题处理

### 常见问题
1. **依赖安装失败**: 删除 `node_modules` 和 `package-lock.json`，重新安装
2. **构建错误**: 检查 TypeScript 错误和配置
3. **Git 冲突**: 使用 `git mergetool` 解决冲突

### 获取帮助
- 查看项目 README
- 检查 GitHub Issues
- 查阅相关技术文档

## 项目状态跟踪

### 当前版本
- **版本**: 0.1.0
- **上次更新**: 2026-03-22
- **下次计划更新**: 待定

### 里程碑
- [x] 项目初始化和基础结构
- [ ] 核心播放器功能完善
- [ ] 用户系统实现
- [ ] 生产环境部署

---

**最后更新**: 2026-03-24  
**维护者**: OpenClaw Assistant  
**备注**: 此文档用于项目管理，建议定期更新