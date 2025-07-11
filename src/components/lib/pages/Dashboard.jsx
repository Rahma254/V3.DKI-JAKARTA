import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import LiveStreamCard from '../components/LiveStreamCard'
import ProfileSidebar from '../components/ProfileSidebar'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [liveStreams, setLiveStreams] = useState([])

  useEffect(() => {
    const fetchUserAndStreams = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const { data: streams } = await supabase
        .from('live_streams')
        .select('*')
        .eq('is_live', true)
      
      setLiveStreams(streams || [])
    }

    fetchUserAndStreams()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProfileSidebar user={user} />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Live Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveStreams.map(stream => (
              <LiveStreamCard 
                key={stream.id} 
                stream={stream} 
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-x-4">
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {/* Start Streaming */}}
            >
              Start Streaming
            </button>
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => {/* Create Room */}}
            >
              Create Chat Room
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
