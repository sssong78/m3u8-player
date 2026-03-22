'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ListMusic, 
  Star, 
  History, 
  Settings, 
  Plus, 
  Trash2,
  Search,
  ChevronRight,
  Folder
} from 'lucide-react'
import { usePlayerStore } from '@/lib/store'

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'playlists' | 'favorites' | 'history'>('playlists')
  
  const { 
    playlists, 
    favorites, 
    playHistory,
    addPlaylist,
    removePlaylist,
    addFavorite,
    removeFavorite,
    clearHistory 
  } = usePlayerStore()

  const [newPlaylistName, setNewPlaylistName] = useState('')

  const handleAddPlaylist = () => {
    if (newPlaylistName.trim()) {
      addPlaylist(newPlaylistName.trim())
      setNewPlaylistName('')
    }
  }

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFavorites = favorites.filter(fav =>
    fav.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredHistory = playHistory.filter(history =>
    history.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Card>
        <CardContent className="p-2">
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'playlists' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('playlists')}
            >
              <div className="flex items-center justify-center gap-2">
                <ListMusic className="h-4 w-4" />
                Playlists
              </div>
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('favorites')}
            >
              <div className="flex items-center justify-center gap-2">
                <Star className="h-4 w-4" />
                Favorites
              </div>
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('history')}
            >
              <div className="flex items-center justify-center gap-2">
                <History className="h-4 w-4" />
                History
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content based on active tab */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {activeTab === 'playlists' && 'Playlists'}
              {activeTab === 'favorites' && 'Favorites'}
              {activeTab === 'history' && 'Recent History'}
            </CardTitle>
            {activeTab === 'history' && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Playlists Tab */}
          {activeTab === 'playlists' && (
            <div className="space-y-4">
              {/* Add Playlist Form */}
              <div className="flex gap-2">
                <Input
                  placeholder="New playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlaylist()}
                />
                <Button onClick={handleAddPlaylist}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Playlists List */}
              <div className="space-y-2">
                {filteredPlaylists.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No playlists yet</p>
                    <p className="text-sm">Create your first playlist above</p>
                  </div>
                ) : (
                  filteredPlaylists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <ListMusic className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{playlist.name}</p>
                          <p className="text-xs text-gray-500">
                            {playlist.count} {playlist.count === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePlaylist(playlist.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-2">
              {filteredFavorites.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No favorites yet</p>
                  <p className="text-sm">Star channels to add them here</p>
                </div>
              ) : (
                filteredFavorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{fav.title}</p>
                        <p className="text-xs text-gray-500 truncate">{fav.url}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-2">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No history yet</p>
                  <p className="text-sm">Play videos to build your history</p>
                </div>
              ) : (
                filteredHistory.map((history) => (
                  <div
                    key={history.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <History className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{history.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(history.playedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Player Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Folder className="h-4 w-4 mr-2" />
            Import Playlist
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ListMusic className="h-4 w-4 mr-2" />
            Export Playlist
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}