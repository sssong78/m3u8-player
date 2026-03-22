'use client'

import { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Pause, Upload, Link as LinkIcon, Loader2 } from 'lucide-react'
import { usePlayerStore } from '@/lib/store'

// Video.js player types
declare global {
  interface Window {
    videojs: any
  }
}

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { addToHistory } = usePlayerStore()

  // Initialize Video.js player
  useEffect(() => {
    if (!videoRef.current) return

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      responsive: true,
      playbackRates: [0.5, 1, 1.5, 2],
      html5: {
        hls: {
          overrideNative: true,
        },
      },
    })

    // Event listeners
    playerRef.current.on('play', () => setIsPlaying(true))
    playerRef.current.on('pause', () => setIsPlaying(false))
    playerRef.current.on('error', (e: any) => {
      setError('Failed to load video. Please check the URL and try again.')
      console.error('Video.js error:', e)
    })
    playerRef.current.on('loadeddata', () => {
      setIsLoading(false)
      setError(null)
      if (currentUrl) {
        addToHistory(currentUrl, 'Video Stream')
      }
    })

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
      }
    }
  }, [])

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.play()
    }
  }

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause()
    }
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUrl.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      if (playerRef.current) {
        playerRef.current.src({
          src: currentUrl,
          type: 'application/x-mpegURL',
        })
        playerRef.current.play()
      }
    } catch (err) {
      setError('Invalid URL or unsupported format')
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's a m3u/m3u8 file
    if (!file.name.match(/\.(m3u8?)$/i)) {
      setError('Please upload a valid m3u or m3u8 file')
      return
    }

    setIsLoading(true)
    const reader = new FileReader()
    
    reader.onload = (event) => {
      const content = event.target?.result as string
      // Parse m3u8 file and extract first URL
      const lines = content.split('\n')
      const urlLine = lines.find(line => line.startsWith('http'))
      
      if (urlLine) {
        setCurrentUrl(urlLine)
        if (playerRef.current) {
          playerRef.current.src({
            src: urlLine,
            type: 'application/x-mpegURL',
          })
          playerRef.current.play()
        }
      } else {
        setError('No valid URLs found in the playlist file')
        setIsLoading(false)
      }
    }
    
    reader.onerror = () => {
      setError('Failed to read file')
      setIsLoading(false)
    }
    
    reader.readAsText(file)
  }

  const sampleUrls = [
    { label: 'Sample HLS Stream 1', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
    { label: 'Sample HLS Stream 2', url: 'https://bitdash-a.akamaihd.net/s/content/media/Manifest_1080p.m3u8' },
  ]

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Enter m3u8 URL (e.g., https://example.com/stream.m3u8)"
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" disabled={isLoading || !currentUrl.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                Play
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">Or</div>
              <div className="flex-1 border-t"></div>
            </div>

            {/* File Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <Upload className="h-4 w-4" />
                Upload m3u/m3u8 file
                <input
                  type="file"
                  accept=".m3u,.m3u8"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Upload a playlist file to load multiple streams
              </p>
            </div>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div data-vjs-player className="rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="video-js vjs-default-skin vjs-big-play-centered"
              playsInline
            />
          </div>

          {/* Custom Controls */}
          <div className="p-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={isPlaying ? handlePause : handlePlay}
                disabled={!currentUrl}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
              
              <div className="text-sm text-gray-500">
                {currentUrl ? 'Now playing' : 'Enter URL to start'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy URL
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Streams */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Try Sample Streams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sampleUrls.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start"
                onClick={() => setCurrentUrl(sample.url)}
              >
                <Play className="h-4 w-4 mr-2" />
                {sample.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}