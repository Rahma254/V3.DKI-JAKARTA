import React from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom'

// Import Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import LiveStreaming from './pages/LiveStreaming'
import EditProfile from './pages/EditProfile'

// Import Private Route
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live-streaming" element={<LiveStreaming />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-4xl">404 - Page Not Found</h1>
            </div>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App Enter
