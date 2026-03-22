# M3U8 Player

A modern, feature-rich online M3U8 player built with Next.js and Video.js. Play HLS streams and m3u8 files directly in your browser.

## Features

- 🎬 **Play M3U8 URLs** - Direct streaming from any HLS source
- 📁 **File Upload** - Upload and parse m3u/m3u8 playlist files
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⭐ **Favorites System** - Save your favorite streams
- 📚 **Playlist Management** - Create and organize playlists
- ⏱️ **Play History** - Track recently played streams
- 🎛️ **Advanced Controls** - Playback rate, volume, and more
- 🌓 **Dark/Light Mode** - Automatic theme switching

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Video Player**: Video.js + videojs-contrib-hls
- **State Management**: Zustand
- **UI Components**: Shadcn/ui + Lucide React icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sssong78/m3u8-player.git
cd m3u8-player
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Usage

1. **Enter a URL**: Paste a m3u8 URL in the input field and click "Play"
2. **Upload a File**: Click "Upload m3u/m3u8 file" to load a playlist
3. **Try Samples**: Use the sample streams to test the player

### Features

- **Playback Controls**: Play, pause, volume, fullscreen
- **Playback Speed**: Adjust playback rate (0.5x to 2x)
- **Favorites**: Star streams to save them for later
- **Playlists**: Create custom playlists
- **History**: View recently played streams

## Project Structure

```
m3u8-player/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components (shadcn)
│   ├── VideoPlayer.tsx   # Main video player
│   ├── Sidebar.tsx       # Sidebar with playlists/favorites
│   └── Navbar.tsx        # Navigation bar
├── lib/                  # Utilities and stores
│   ├── store.ts          # Zustand state management
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## API Routes

- `POST /api/upload` - Upload and parse m3u8 files
- `GET /api/play` - Stream proxy (future implementation)
- `POST /api/playlists` - Manage playlists (future implementation)

## Development

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

### Adding Features

1. Create components in `/components`
2. Add API routes in `/app/api`
3. Update state management in `/lib/store.ts`
4. Add styles in `/app/globals.css`

## Deployment

The project is configured for deployment on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables (if needed)
4. Deploy

### Environment Variables

Create a `.env.local` file:

```env
# Optional: Add API keys or other secrets here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Video.js](https://videojs.com/) - HTML5 video player
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components

## Support

- Report bugs via [GitHub Issues](https://github.com/sssong78/m3u8-player/issues)
- Feature requests are welcome
- Star the repo if you find it useful!

---

Built with ❤️ by [sssong78](https://github.com/sssong78)