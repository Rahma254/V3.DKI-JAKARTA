import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import ProfileSidebar from '../components/ProfileSidebar'

function EditProfile() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    avatar_url: ''
  })
  const [avatarFile, setAvatarFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        
        // Fetch profile details
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (profileData) {
          setProfile({
            username: profileData.username || '',
            bio: profileData.bio || '',
            avatar_url: profileData.avatar_url || ''
          })
        }
      }
    }

    fetchUserProfile()
  }, [])

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0]
    setAvatarFile(file)

    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}_${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      try {
        setLoading(true)
        // Upload avatar
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl }, error: urlError } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath)

        if (urlError) throw urlError

        // Update profile with new avatar URL
        const { error } = await supabase
          .from('profiles')
          .update({ avatar_url: publicUrl })
          .eq('user_id', user.id)

        setProfile(prev => ({ ...prev, avatar_url: publicUrl }))
      } catch (error) {
        console.error('Avatar upload error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          bio: profile.bio
        })
        .eq('user_id', user.id)

      // Update user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { username: profile.username }
      })

      if (error || authError) throw (error || authError)

      navigate('/dashboard')
    } catch (error) {
      console.error('Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProfileSidebar user={user} />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <div className="mr-6">
              <img 
                src={profile.avatar_url || '/default-avatar.png'} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div>
              <label 
                htmlFor="avatar" 
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                {loading ? 'Uploading...' : 'Change Avatar'}
                <input 
                  type="file" 
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
