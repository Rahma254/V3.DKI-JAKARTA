import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function PrivateRoute() {
  const user = supabase.auth.getUser()

  // Jika tidak ada user, redirect ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Jika user ada, render child routes
  return <Outlet />
}

export default PrivateRoute
