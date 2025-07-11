import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function ProfileSidebar({ user }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error.message)
    }
  }

  if (!user) return null

  return (
    <div className="w-64 bg-white shadow-md h-screen p-6">
      <div className="flex flex-col items-center mb-8">
        <img 
          src={user.user_metadata.avatar_url || '/default-avatar.png'} 
          alt={user.user_metadata.username} 
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <h2 className="text-xl font-bold">{user.user_metadata.username}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 hover:bg-gray-100 rounded transition"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/edit-profile" 
              className="flex items-center p-3 hover:bg-gray-100 rounded transition"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Edit Profile
            </Link>
          </li>
          <li>
            <Link 
              to="/live-streaming" 
              className="flex items-center p-3 hover:bg-gray-100 rounded transition"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Start Streaming
            </Link>
          </li>
          <li>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center p-3 hover:bg-gray-100 rounded transition text-left"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default ProfileSidebar
Enter
