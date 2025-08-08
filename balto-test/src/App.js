import React, { useState, useEffect } from 'react';
import './App.css';

// Login Component
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    // In a real app, you would validate credentials with a backend
    onLogin({ email });
  };

  return (
    <div className="Login">
      <h2>Customer Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

// CustomerDashboard Component
function CustomerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('loads');
  
  return (
    <div className="Dashboard">
      {/* Top Navigation */}
      <nav className="dashboard-nav">
        <div className="logo-container">
          <div className="balto-logo">
            <h1 className="balto-text">Balto</h1>
            <p className="tagline-text">Shipping that matters</p>
          </div>
        </div>
        <div className="user-info">
          <span>Welcome, {user.email}</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === 'loads' && (
          <section className="customer-loads">
            <h2>Your Shipments</h2>
            
            {/* Active Shipment with ETA */}
            <div className="active-shipment">
              <div className="shipment-header">
                <h3>Active Shipment</h3>
                <span className="shipment-id">ID: #12345</span>
              </div>
              
              <div className="shipment-route">
                <div className="origin">
                  <div className="location-dot origin-dot"></div>
                  <div className="location-details">
                    <h4>Chicago, IL</h4>
                    <p>Pickup: Aug 7, 2025</p>
                  </div>
                </div>
                
                <div className="route-line">
                  <div className="truck-icon">🚚</div>
                </div>
                
                <div className="destination">
                  <div className="location-dot destination-dot"></div>
                  <div className="location-details">
                    <h4>Detroit, MI</h4>
                    <p>Delivery: Aug 9, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="eta-container">
                <div className="eta-header">
                  <h4>Estimated Time of Arrival</h4>
                  <span className="eta-time">Aug 9, 10:30 AM</span>
                </div>
                <div className="eta-progress">
                  <div className="eta-progress-bar" style={{ width: '65%' }}></div>
                </div>
                <div className="eta-status">On schedule</div>
              </div>
              
              <button className="message-driver-btn">
                Message Driver
              </button>
            </div>
            
            {/* Recent Shipments */}
            <div className="recent-shipments">
              <h3>Recent Shipments</h3>
              <div className="shipment-list">
                <div className="shipment-item">
                  <div className="shipment-item-header">
                    <span className="shipment-item-id">#12344</span>
                    <span className="shipment-item-status completed">Delivered</span>
                  </div>
                  <div className="shipment-item-route">
                    <span>New York, NY</span>
                    <span className="route-arrow">→</span>
                    <span>Boston, MA</span>
                  </div>
                  <div className="shipment-item-date">Aug 5, 2025</div>
                </div>
                
                <div className="shipment-item">
                  <div className="shipment-item-header">
                    <span className="shipment-item-id">#12343</span>
                    <span className="shipment-item-status completed">Delivered</span>
                  </div>
                  <div className="shipment-item-route">
                    <span>Miami, FL</span>
                    <span className="route-arrow">→</span>
                    <span>Atlanta, GA</span>
                  </div>
                  <div className="shipment-item-date">Aug 1, 2025</div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {activeTab === 'messages' && (
          <section className="customer-messages">
            <h2>Messages</h2>
            
            <div className="message-container">
              <div className="message-list">
                <div className="message-item unread">
                  <div className="message-sender">Mack (Driver)</div>
                  <div className="message-preview">I'm about 30 minutes away from the destination...</div>
                  <div className="message-time">10:15 AM</div>
                </div>
                
                <div className="message-item">
                  <div className="message-sender">Dispatch</div>
                  <div className="message-preview">Your shipment #12345 has been picked up...</div>
                  <div className="message-time">Yesterday</div>
                </div>
                
                <div className="message-item">
                  <div className="message-sender">System</div>
                  <div className="message-preview">Your shipment #12344 has been delivered...</div>
                  <div className="message-time">Aug 5</div>
                </div>
              </div>
              
              <div className="message-detail">
                <div className="message-detail-header">
                  <h3>Mack (Driver)</h3>
                  <span>Shipment #12345</span>
                </div>
                
                <div className="message-detail-content">
                  <div className="message-bubble received">
                    <div className="message-text">Hello! I'm your driver for shipment #12345. I've just picked up your load and am on my way.</div>
                    <div className="message-time">9:30 AM</div>
                  </div>
                  
                  <div className="message-bubble sent">
                    <div className="message-text">Great! Thanks for letting me know. What's the ETA?</div>
                    <div className="message-time">9:45 AM</div>
                  </div>
                  
                  <div className="message-bubble received">
                    <div className="message-text">I'm about 30 minutes away from the destination. Traffic is good today!</div>
                    <div className="message-time">10:15 AM</div>
                  </div>
                </div>
                
                <div className="message-input">
                  <input type="text" placeholder="Type your message..." />
                  <button className="send-button">Send</button>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {activeTab === 'profile' && (
          <section className="customer-profile">
            <h2>Your Profile</h2>
            
            <div className="profile-details">
              <div className="profile-section">
                <h3>Account Information</h3>
                <div className="profile-field">
                  <label>Name</label>
                  <div>{user.email.split('@')[0]}</div>
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <div>{user.email}</div>
                </div>
                <div className="profile-field">
                  <label>Member Since</label>
                  <div>August 2025</div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3>Shipping Preferences</h3>
                <div className="profile-field">
                  <label>Default Location</label>
                  <div>Chicago, IL</div>
                </div>
                <div className="profile-field">
                  <label>Notification Preferences</label>
                  <div>Email, SMS</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div 
          className={`bottom-nav-item ${activeTab === 'loads' ? 'active' : ''}`}
          onClick={() => setActiveTab('loads')}
        >
          <div className="bottom-nav-icon">📦</div>
          <div className="bottom-nav-label">Shipments</div>
        </div>
        
        <div 
          className={`bottom-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <div className="bottom-nav-icon">💬</div>
          <div className="bottom-nav-label">Messages</div>
        </div>
        
        <div 
          className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <div className="bottom-nav-icon">👤</div>
          <div className="bottom-nav-label">Profile</div>
        </div>
      </nav>
    </div>
  );
}

// Main App Component
function App() {
  // State for controlling which view to display
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Effect hook to show login page after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000); // 3 seconds delay
    
    // Cleanup function to clear the timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Handle successful login
  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  // Landing page with just the logo and tagline
  if (!showLogin && !user) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="balto-logo">
            <h1 className="balto-text">Balto</h1>
            <p className="tagline-text">Shipping that matters</p>
          </div>
        </header>
      </div>
    );
  }

  // Login page
  if (showLogin && !user) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="balto-logo">
            <h1 className="balto-text">Balto</h1>
            <p className="tagline-text">Shipping that matters</p>
          </div>
          <Login onLogin={handleLogin} />
        </header>
      </div>
    );
  }

  // CustomerDashboard (after successful login)
  return (
    <div className="App">
      <CustomerDashboard user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
