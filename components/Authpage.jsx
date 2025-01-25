import React, { useState } from 'react';
import { signIn } from '../src/config/firebasease';

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await signIn(email, password);
      onLogin();
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Farmer Login</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;