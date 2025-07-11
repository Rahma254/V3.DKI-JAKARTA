import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

function ChatComponent({ streamKey }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    const subscribeToMessages = () => {
      const channel = supabase
        .channel(`stream:${streamKey}`)
        .on('broadcast', 
          { event: 'chat_message' }, 
          (payload) => {
            setMessages(prev => [...prev, payload.message])
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }

    fetchUser()
    const unsubscribe = subscribeToMessages()

    return () => {
      unsubscribe()
    }
  }, [streamKey])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      stream_key: streamKey,
      user_id: user.id,
      content: newMessage,
      username: user.user_metadata.username
    }

    const { error } = await supabase
      .from('stream_messages')
      .insert(message)

    supabase
      .channel(`stream:${streamKey}`)
      .send({
        type: 'broadcast',
        event: 'chat_message',
        payload: { message }
      })

    setNewMessage('')
  }

  return (
    <div className="w-1/4 bg-gray-800 p-4">
      <div className="h-[70vh] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.username}: </strong>
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatComponent Enter
