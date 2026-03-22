# Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsssong78%2Fm3u8-player)

1. Click the button above
2. Connect your GitHub account
3. Select the repository
4. Click "Deploy"

## Manual Deployment

### 1. Build the Project
```bash
npm run build
# or
yarn build
# or
pnpm build
```

### 2. Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### 3. Follow the prompts
- Login to Vercel
- Select the project
- Configure settings
- Deploy

## Environment Variables

No environment variables are required for basic functionality.

## Custom Domain

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Domains"
4. Add your custom domain
5. Configure DNS settings

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Consider adding Sentry for error monitoring
- **Uptime Monitoring**: Use services like UptimeRobot

## Updates

To update the deployed application:

1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Or manually trigger deployment in Vercel Dashboard

## Troubleshooting

### Build Errors
- Check Node.js version (requires 18+)
- Clear `node_modules` and reinstall
- Check TypeScript errors

### Runtime Errors
- Check browser console
- Verify CORS settings for external streams
- Check network connectivity

### Performance Issues
- Enable Vercel Edge Functions for API routes
- Use CDN for static assets
- Optimize images and videos