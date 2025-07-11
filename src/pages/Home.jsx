import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container" style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>
        Welcome to <span style={{ background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Jakarta Platform</span>
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', opacity: 0.8, marginBottom: '2.5rem' }}>
        The most luxurious platform for premium content and live streaming. Developed by Nabila Ahmad Studio.
      </p>
      <div>
        <Link to="/login" className="btn btn-primary" style={{ marginRight: '1rem' }}>Get Started</Link>
        <Link to="/dashboard" className="btn btn-secondary">View Dashboard</Link>
      </div>
    </div>
  );
}

export default Home;Enter
