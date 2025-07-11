import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container">
      <div style={{ maxWidth: '450px', margin: '2rem auto' }}>
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Welcome Back</h2>
            <p style={{color: 'var(--color-text)', opacity: 0.7}}>Login to continue to Jakarta Platform.</p>
          </div>
          
          <form>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-input" placeholder="you@example.com" />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-input" placeholder="••••••••" />
            </div>
            
            <div className="form-group" style={{marginTop: '2rem'}}>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
            </div>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{fontSize: '0.9rem'}}>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;Enter
