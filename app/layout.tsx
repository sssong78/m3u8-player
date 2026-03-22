import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'M3U8 Player - Online HLS Video Player',
  description: 'Free online M3U8 player for HLS streaming. Play m3u8 files directly in your browser.',
  keywords: ['m3u8', 'hls', 'video player', 'online player', 'streaming'],
  authors: [{ name: 'sssong78' }],
  openGraph: {
    title: 'M3U8 Player - Online HLS Video Player',
    description: 'Free online M3U8 player for HLS streaming',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
              <p>© {new Date().getFullYear()} M3U8 Player. Built with Next.js & Video.js</p>
              <p className="text-sm mt-2">Open source project by sssong78</p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  )
}