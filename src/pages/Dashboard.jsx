import React from 'react';

function Dashboard() {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p style={{opacity: 0.8}}>Welcome to your personal dashboard.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="card">
          <h3>My Profile</h3>
          <p>View and edit your personal information.</p>
        </div>
        <div className="card">
          <h3>Live Streams</h3>
          <p>Browse available live streaming events.</p>
        </div>
        <div className="card">
          <h3>Settings</h3>
          <p>Manage your account settings and preferences.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;Enter
