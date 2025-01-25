import React, { useState, useEffect } from 'react';
import { signIn, signUp, auth } from './config/firebase';
import AuthPage from './components/Authpage';
import ProductListing from './components/ProductListing';
import FarmerDashboard from './components/FarmerDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize with default admin user if not exists
    const initializeAdmin = async () => {
      try {
        await signIn('admin@admin.com', 'admin@123');
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          await signUp('admin@admin.com', 'admin@123', { 
            name: 'Admin Farmer', 
            role: 'admin' 
          });
        }
      }
    };

    initializeAdmin();

    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setCurrentPage('home');
  };

  const handleLogout = () => {
    auth.signOut();
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <AuthPage onLogin={handleLogin} />;
      case 'dashboard':
        return <FarmerDashboard user={user} onLogout={handleLogout} />;
      case 'home':
      default:
        return <ProductListing user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div>
      <header style={{
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Farmer Market</h1>
        <div>
          {!user ? (
            <button 
              onClick={() => setCurrentPage('login')}
              style={{
                padding: '5px 10px',
                backgroundColor: 'white',
                color: 'green',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              Login
            </button>
          ) : (
            <>
              <button 
                onClick={() => setCurrentPage('home')}
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: 'white',
                  color: 'green',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: 'white',
                  color: 'green',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'white',
                  color: 'green',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>
      {renderPage()}
    </div>
  );
}

export default App;