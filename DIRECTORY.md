# 项目目录结构说明

## 根目录
```
m3u8-player/
├── 📁 app/                    # Next.js 应用目录
├── 📁 components/            # React 组件
├── 📁 lib/                   # 工具函数和状态管理
├── 📁 public/                # 静态资源
├── 📄 requirements.md        # 需求文档（新增）
├── 📄 PROJECT.md            # 项目管理文档（新增）
├── 📄 DIRECTORY.md          # 目录说明（本文件）
├── 📄 README.md             # 项目说明
├── 📄 DEPLOY.md             # 部署指南
├── 📄 package.json          # 项目配置
├── 📄 package-lock.json     # 依赖锁定
├── 📄 tsconfig.json         # TypeScript 配置
├── 📄 tailwind.config.ts    # Tailwind 配置
├── 📄 next.config.js        # Next.js 配置
├── 📄 next.config.ts        # Next.js TypeScript 配置
├── 📄 postcss.config.js     # PostCSS 配置
├── 📄 postcss.config.mjs    # PostCSS ES 模块配置
└── 📄 .gitignore            # Git 忽略文件
```

## 详细说明

### 📁 app/ - Next.js 应用目录
Next.js 14 App Router 结构
```
app/
├── 📄 globals.css          # 全局样式
├── 📄 layout.tsx           # 根布局组件
├── 📄 page.tsx             # 首页组件
└── 📁 api/                 # API 路由（待完善）
```

### 📁 components/ - React 组件
UI 组件和业务组件
```
components/
├── 📁 ui/                  # Shadcn/ui 组件
├── 📄 VideoPlayer.tsx      # 视频播放器组件
├── 📄 Sidebar.tsx          # 侧边栏组件
└── 📄 Stats.tsx            # 统计信息组件
```

### 📁 lib/ - 工具函数和状态管理
工具函数、状态管理和配置
```
lib/
└── 📄 utils.ts             # 工具函数（待完善）
```

### 📁 public/ - 静态资源
图片、字体等静态文件
```
public/
└── （当前为空，可添加 favicon.ico 等）
```

## 新增文档文件说明

### 📄 requirements.md
- **用途**: 详细的项目需求规格说明
- **内容**: 功能需求、技术需求、开发计划等
- **维护**: 随着项目发展更新

### 📄 PROJECT.md
- **用途**: 项目管理文档
- **内容**: 项目信息、快速开始、工作流、常用命令
- **维护**: 定期更新项目状态

### 📄 DIRECTORY.md
- **用途**: 目录结构说明（本文件）
- **内容**: 详细的项目文件结构说明
- **维护**: 当目录结构变化时更新

## 建议的目录扩展

根据项目发展，建议添加以下目录：

### 1. 测试目录
```
tests/
├── unit/                  # 单元测试
├── integration/           # 集成测试
└── e2e/                  # 端到端测试
```

### 2. 类型定义目录
```
types/
├── index.d.ts            # 全局类型定义
└── api/                  # API 类型定义
```

### 3. 文档目录
```
docs/
├── api/                  # API 文档
├── guides/               # 使用指南
└── development/          # 开发文档
```

### 4. 脚本目录
```
scripts/
├── build/               # 构建脚本
├── deploy/              # 部署脚本
└── utils/               # 工具脚本
```

## Git 仓库信息

### 远程仓库
- **URL**: https://github.com/sssong78/m3u8-player
- **分支**: main
- **类型**: 公开仓库

### 本地仓库
- **路径**: `/root/.openclaw/workspace/projects/m3u8-player/`
- **状态**: 已连接到远程仓库
- **最新提交**: e132932 Add deployment guide

## 开发建议

1. **保持目录结构清晰**
2. **按功能组织文件**
3. **及时更新文档**
4. **遵循命名约定**
5. **定期清理无用文件**

---

**最后更新**: 2026-03-24  
**备注**: 此文档帮助理解项目结构，建议在添加新目录或文件时更新