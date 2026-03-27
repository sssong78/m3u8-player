#!/bin/bash

# Cloudflare Pages GitHub 集成设置脚本
# 使用方法: ./setup-cloudflare.sh

set -e

echo "=== Cloudflare Pages GitHub 集成设置 ==="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 检测到 Next.js 项目${NC}"
echo ""

# 显示当前配置
echo "项目配置:"
echo "- 名称: $(grep '"name"' package.json | cut -d'"' -f4)"
echo "- Node.js 版本: $(grep '"node"' package.json | grep -o '[0-9]\+' || echo '未指定')"
echo "- 构建命令: $(grep '"build"' package.json | cut -d'"' -f4)"
echo ""

# 检查必要的文件
echo "检查配置文件:"
if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "${GREEN}✓ GitHub Actions 工作流已配置${NC}"
else
    echo -e "${YELLOW}⚠ GitHub Actions 工作流未找到${NC}"
fi

if [ -f "cloudflare.json" ]; then
    echo -e "${GREEN}✓ Cloudflare Pages 配置文件已存在${NC}"
else
    echo -e "${YELLOW}⚠ Cloudflare Pages 配置文件未找到${NC}"
fi

if [ -f "next.config.js" ] || [ -f "next.config.ts" ]; then
    echo -e "${GREEN}✓ Next.js 配置文件已存在${NC}"
else
    echo -e "${YELLOW}⚠ Next.js 配置文件未找到${NC}"
fi

echo ""
echo "=== 设置步骤 ==="
echo ""

echo "1. 创建 Cloudflare API Token:"
echo "   a. 访问 https://dash.cloudflare.com"
echo "   b. 点击右上角头像 → My Profile"
echo "   c. 选择 API Tokens → Create Token"
echo "   d. 使用模板: Edit Cloudflare Pages"
echo "   e. 复制 Token (格式: cfat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)"
echo ""

echo "2. 获取 Cloudflare Account ID:"
echo "   a. 在 Cloudflare Dashboard 左下角找到 Account ID"
echo "   b. 复制 ID (格式: fdf3c7cdfb1c56f60ad2b9caac2254ad)"
echo ""

echo "3. 设置 GitHub Secrets:"
echo "   a. 访问 https://github.com/sssong78/m3u8-player/settings/secrets/actions"
echo "   b. 点击 New repository secret"
echo "   c. 添加:"
echo "      - Name: CLOUDFLARE_API_TOKEN"
echo "      - Value: 你的 Cloudflare API Token"
echo "   d. 再次点击 New repository secret"
echo "      - Name: CLOUDFLARE_ACCOUNT_ID"
echo "      - Value: 你的 Cloudflare Account ID"
echo ""

echo "4. 连接 GitHub 到 Cloudflare Pages:"
echo "   a. 访问 https://dash.cloudflare.com/?to=/:account/pages"
echo "   b. 点击 Create application → Pages"
echo "   c. 点击 Connect to Git → 选择 GitHub"
echo "   d. 授权访问并选择仓库: sssong78/m3u8-player"
echo "   e. 配置:"
echo "      - Project name: m3u8-player"
echo "      - Production branch: main"
echo "      - Framework preset: Next.js"
echo "      - Build command: next build"
echo "      - Build output directory: .next"
echo "      - Root directory: /"
echo "   f. 点击 Save and Deploy"
echo ""

echo "5. 测试部署:"
echo "   a. 推送代码到 main 分支:"
echo "      git add ."
echo "      git commit -m '测试 Cloudflare Pages 部署'"
echo "      git push origin main"
echo "   b. 查看部署状态:"
echo "      - GitHub Actions: https://github.com/sssong78/m3u8-player/actions"
echo "      - Cloudflare Pages: https://dash.cloudflare.com/.../pages/view/m3u8-player"
echo "   c. 访问网站: https://m3u8-player.pages.dev"
echo ""

echo "=== 验证步骤 ==="
echo ""

echo "验证本地构建:"
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 本地构建成功${NC}"
else
    echo -e "${RED}✗ 本地构建失败，请检查错误${NC}"
    exit 1
fi

echo ""
echo "验证 Git 远程仓库:"
if git remote -v | grep -q "github.com/sssong78/m3u8-player"; then
    echo -e "${GREEN}✓ Git 远程仓库配置正确${NC}"
else
    echo -e "${YELLOW}⚠ Git 远程仓库未配置或配置不正确${NC}"
fi

echo ""
echo "=== 快速链接 ==="
echo ""
echo "GitHub 仓库: https://github.com/sssong78/m3u8-player"
echo "GitHub Actions: https://github.com/sssong78/m3u8-player/actions"
echo "GitHub Secrets: https://github.com/sssong78/m3u8-player/settings/secrets/actions"
echo "Cloudflare Pages: https://dash.cloudflare.com/?to=/:account/pages"
echo "部署后访问: https://m3u8-player.pages.dev"
echo ""

echo "=== 完成 ==="
echo ""
echo "按照上述步骤完成 Cloudflare Pages 的 GitHub 集成。"
echo "如有问题，请参考 DEPLOYMENT.md 文件中的详细说明。"