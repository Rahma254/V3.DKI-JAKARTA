import React from 'react'
import { Link } from 'react-router-dom'

function LiveStreamCard({ stream }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <div className="relative">
        {/* Placeholder for stream thumbnail */}
        <div className="bg-gray-300 h-48 w-full flex items-center justify-center">
          {stream.is_live ? (
            <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
              LIVE
            </span>
          ) : (
            <span className="absolute top-4 left-4 bg-gray-500 text-white px-2 py-1 rounded text-sm">
              Offline
            </span>
          )}
          <img 
            src={stream.thumbnail_url || 'default-thumbnail.jpg'} 
            alt={stream.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img 
            src={stream.profiles?.avatar_url || 'default-avatar.jpg'} 
            alt={stream.profiles?.username} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold text-lg">{stream.title}</h3>
            <p className="text-gray-600 text-sm">
              {stream.profiles?.username || 'Unknown Streamer'}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            🔴 {stream.viewer_count || 0} Viewers
          </div>
          
          {stream.is_live ? (
            <Link 
              to={`/stream/${stream.id}`} 
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Watch Now
            </Link>
          ) : (
            <span className="text-gray-400 text-sm">Offline</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default LiveStreamCard
import React from 'react'
import { Link } from 'react-router-dom'

function LiveStreamCard({ stream }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <div className="relative">
        {/* Placeholder for stream thumbnail */}
        <div className="bg-gray-300 h-48 w-full flex items-center justify-center">
          {stream.is_live ? (
            <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
              LIVE
            </span>
          ) : (
            <span className="absolute top-4 left-4 bg-gray-500 text-white px-2 py-1 rounded text-sm">
              Offline
            </span>
          )}
          <img 
            src={stream.thumbnail_url || 'default-thumbnail.jpg'} 
            alt={stream.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img 
            src={stream.profiles?.avatar_url || 'default-avatar.jpg'} 
            alt={stream.profiles?.username} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold text-lg">{stream.title}</h3>
            <p className="text-gray-600 text-sm">
              {stream.profiles?.username || 'Unknown Streamer'}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            🔴 {stream.viewer_count || 0} Viewers
          </div>
          
          {stream.is_live ? (
            <Link 
              to={`/stream/${stream.id}`} 
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Watch Now
            </Link>
          ) : (
            <span className="text-gray-400 text-sm">Offline</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default LiveStreamCard
