import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import ChatComponent from '../components/ChatComponent'

function LiveStreaming() {
  const [streamKey, setStreamKey] = useState(null)
  const [isLive, setIsLive] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const generateStreamKey = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const key = `${user.id}-${Date.now()}`
      setStreamKey(key)
    }

    generateStreamKey()
  }, [])

  const startLiveStream = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('live_streams')
        .insert({
          user_id: user.id,
          stream_key: streamKey,
          title: 'My Live Stream',
          is_live: true
        })

      if (error) throw error

      setIsLive(true)
      // Implement WebRTC or use external streaming service
    } catch (err) {
      console.error('Start stream error:', err)
    }
  }

  const stopLiveStream = async () => {
    try {
      const { error } = await supabase
        .from('live_streams')
        .update({ is_live: false })
        .eq('stream_key', streamKey)

      setIsLive(false)
    } catch (err) {
      console.error('Stop stream error:', err)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-3/4 p-4">
        <div className="bg-black h-[70vh] flex items-center justify-center">
          {isLive ? (
            <video ref={videoRef} autoPlay playsInline />
          ) : (
            <div>Start your live stream</div>
          )}
        </div>
        
        <div className="mt-4">
          {!isLive ? (
            <button 
              onClick={startLiveStream}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Start Streaming
            </button>
          ) : (
            <button 
              onClick={stopLiveStream}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Stop Streaming
            </button>
          )}
        </div>
      </div>

      <ChatComponent streamKey={streamKey} />
    </div>
  )
}

export default LiveStreaming Enter
