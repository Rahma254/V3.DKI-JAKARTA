import React from 'react';

function EditProfile() {
  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="card">
          <h2 style={{ textAlign: 'center' }}>Edit Profile</h2>
          <form style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" id="fullName" className="form-input" defaultValue="Nabila Ahmad" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-input" defaultValue="you@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea id="bio" rows="4" className="form-input" placeholder="Tell us about yourself..."></textarea>
            </div>
            <div className="form-group" style={{marginTop: '2rem'}}>
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;Enter
