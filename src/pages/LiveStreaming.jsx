import React from 'react';

function LiveStreaming() {
  return (
    <div className="container">
      <h2>Live Streaming</h2>
      <p style={{opacity: 0.8, marginBottom: '2rem'}}>Exclusive live event, now playing.</p>

      <div style={{
        width: '100%',
        aspectRatio: '16 / 9',
        backgroundColor: '#000',
        borderRadius: 'var(--border-radius)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{ color: 'var(--color-text)' }}>[ Video Player Placeholder ]</h3>
        <p style={{ color: 'var(--color-text)', opacity: 0.5 }}>The live stream will appear here.</p>
      </div>
    </div>
  );
}

export default LiveStreaming;
