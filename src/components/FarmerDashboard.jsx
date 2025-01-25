// Suggested code may be subject to a license. Learn more: ~LicenseLog:1120624558.
import React from 'react';

function FarmerDashboard({ user, onLogout }) {
  return (
    <div>
      <h2>Farmer Dashboard</h2>
      <p>Welcome, {user?.displayName || user?.email}!</p>
      {/* Add content for the farmer dashboard here */}
        <div>
        <button onClick={onLogout}>Logout</button>
        </div>
    </div>
  );
}

export default FarmerDashboard;