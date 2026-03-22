import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PlayHistory {
  id: string
  url: string
  title: string
  playedAt: Date
  duration?: number
}

export interface Favorite {
  id: string
  url: string
  title: string
  addedAt: Date
  category?: string
}

export interface Playlist {
  id: string
  name: string
  items: string[] // URLs
  createdAt: Date
  count: number
}

interface PlayerState {
  // State
  currentUrl: string | null
  isPlaying: boolean
  volume: number
  playbackRate: number
  
  // Collections
  playHistory: PlayHistory[]
  favorites: Favorite[]
  playlists: Playlist[]
  
  // Actions
  setCurrentUrl: (url: string | null) => void
  setIsPlaying: (playing: boolean) => void
  setVolume: (volume: number) => void
  setPlaybackRate: (rate: number) => void
  
  addToHistory: (url: string, title?: string) => void
  clearHistory: () => void
  
  addFavorite: (url: string, title?: string, category?: string) => void
  removeFavorite: (id: string) => void
  isFavorite: (url: string) => boolean
  
  addPlaylist: (name: string) => void
  removePlaylist: (id: string) => void
  addToPlaylist: (playlistId: string, url: string) => void
  removeFromPlaylist: (playlistId: string, url: string) => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUrl: null,
      isPlaying: false,
      volume: 1,
      playbackRate: 1,
      
      playHistory: [],
      favorites: [],
      playlists: [],
      
      // Actions
      setCurrentUrl: (url) => set({ currentUrl: url }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setVolume: (volume) => set({ volume }),
      setPlaybackRate: (rate) => set({ playbackRate: rate }),
      
      addToHistory: (url, title = 'Unknown Stream') => {
        const history: PlayHistory = {
          id: Date.now().toString(),
          url,
          title,
          playedAt: new Date(),
        }
        
        set((state) => ({
          playHistory: [history, ...state.playHistory.slice(0, 49)], // Keep last 50 items
        }))
      },
      
      clearHistory: () => set({ playHistory: [] }),
      
      addFavorite: (url, title = 'Unknown Stream', category = 'General') => {
        const favorite: Favorite = {
          id: Date.now().toString(),
          url,
          title,
          addedAt: new Date(),
          category,
        }
        
        set((state) => ({
          favorites: [...state.favorites, favorite],
        }))
      },
      
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        }))
      },
      
      isFavorite: (url) => {
        return get().favorites.some((fav) => fav.url === url)
      },
      
      addPlaylist: (name) => {
        const playlist: Playlist = {
          id: Date.now().toString(),
          name,
          items: [],
          createdAt: new Date(),
          count: 0,
        }
        
        set((state) => ({
          playlists: [...state.playlists, playlist],
        }))
      },
      
      removePlaylist: (id) => {
        set((state) => ({
          playlists: state.playlists.filter((list) => list.id !== id),
        }))
      },
      
      addToPlaylist: (playlistId, url) => {
        set((state) => ({
          playlists: state.playlists.map((list) => {
            if (list.id === playlistId && !list.items.includes(url)) {
              return {
                ...list,
                items: [...list.items, url],
                count: list.count + 1,
              }
            }
            return list
          }),
        }))
      },
      
      removeFromPlaylist: (playlistId, url) => {
        set((state) => ({
          playlists: state.playlists.map((list) => {
            if (list.id === playlistId) {
              return {
                ...list,
                items: list.items.filter((item) => item !== url),
                count: Math.max(0, list.count - 1),
              }
            }
            return list
          }),
        }))
      },
    }),
    {
      name: 'm3u8-player-storage',
      partialize: (state) => ({
        playHistory: state.playHistory,
        favorites: state.favorites,
        playlists: state.playlists,
        volume: state.volume,
      }),
    }
  )
)