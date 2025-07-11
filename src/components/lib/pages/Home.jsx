import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import LiveStreamCard from '../components/LiveStreamCard'

function Home() {
  const [featuredStreams, setFeaturedStreams] = useState([])
  const [popularStreams, setPopularStreams] = useState([])

  useEffect(() => {
    const fetchStreams = async () => {
      // Fetch Featured Live Streams
      const { data: featured } = await supabase
        .from('live_streams')
        .select('*, profiles(username, avatar_url)')
        .eq('is_live', true)
        .order('viewer_count', { ascending: false })
        .limit(6)

      // Fetch Popular Streams (could be recent or high viewer count)
      const { data: popular } = await supabase
        .from('live_streams')
        .select('*, profiles(username, avatar_url)')
        .order('viewer_count', { ascending: false })
        .limit(6)

      setFeaturedStreams(featured || [])
      setPopularStreams(popular || [])
    }

    fetchStreams()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Jakarta Live Streaming Platform</h1>
        <p className="text-xl mb-8">Connect, Stream, and Engage</p>
        
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100 transition"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-transparent border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Featured Streams Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Live Streams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStreams.map(stream => (
            <LiveStreamCard 
              key={stream.id} 
              stream={stream} 
            />
          ))}
        </div>
      </section>

      {/* Popular Streams Section */}
      <section className="container mx-auto px-4 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Streams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularStreams.map(stream => (
            <LiveStreamCard 
              key={stream.id} 
              stream={stream} 
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-500 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-4">Create Account</h3>
              <p>Sign up and set up your profile in minutes</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-green-500 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-4">Start Streaming</h3>
              <p>Go live and share your content with the world</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-purple-500 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-4">Engage & Grow</h3>
              <p>Interact with viewers and build your community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8">Join thousands of creators on Jakarta Live Streaming Platform</p>
        
        <Link 
          to="/register" 
          className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg hover:bg-blue-100 transition"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  )
}

export default Hom
