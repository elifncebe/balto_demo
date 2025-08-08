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

// Dashboard Component
function Dashboard({ user, onLogout }) {
  return (
    <div className="Dashboard">
      <nav className="dashboard-nav">
        <div className="logo-container">
          <div className="balto-logo">
            <h1 className="balto-text">Balto</h1>
            <p className="tagline-text">Shipping that matters</p>
          </div>
        </div>
        <ul className="nav-links">
          <li><a href="#loads">Loads</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#messages">Messages</a></li>
        </ul>
        <div className="user-info">
          <span>Welcome, {user.email}</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </nav>
      
      <div className="dashboard-content">
        <section className="driver-readiness">
          <h2>Driver Readiness</h2>
          <div className="readiness-stats">
            <div className="stat-card">
              <h3>Available Drivers</h3>
              <div className="stat-value">24</div>
              <div className="stat-trend positive">+3 from yesterday</div>
            </div>
            <div className="stat-card">
              <h3>On Duty</h3>
              <div className="stat-value">18</div>
              <div className="stat-trend">No change</div>
            </div>
            <div className="stat-card">
              <h3>Off Duty</h3>
              <div className="stat-value">6</div>
              <div className="stat-trend negative">+2 from yesterday</div>
            </div>
          </div>
          
          <div className="driver-list">
            <h3>Driver Status</h3>
            <table>
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Hours Available</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Smith</td>
                  <td className="status-available">Available</td>
                  <td>Chicago, IL</td>
                  <td>8.5 hrs</td>
                </tr>
                <tr>
                  <td>Maria Garcia</td>
                  <td className="status-on-duty">On Duty</td>
                  <td>Detroit, MI</td>
                  <td>3.2 hrs</td>
                </tr>
                <tr>
                  <td>Robert Johnson</td>
                  <td className="status-off-duty">Off Duty</td>
                  <td>Indianapolis, IN</td>
                  <td>0 hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
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

  // Dashboard (after successful login)
  return (
    <div className="App">
      <Dashboard user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
