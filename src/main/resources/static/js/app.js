// Main React application for Balto

// Create a context for authentication
const AuthContext = React.createContext(null);

// Authentication Provider component
function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Check if user is already logged in on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('balto_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/auth/login', { email, password });
      const userData = response.data.data;
      setUser(userData);
      localStorage.setItem('balto_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/auth/signup', { name, email, password });
      const userData = response.data.data;
      setUser(userData);
      localStorage.setItem('balto_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('balto_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
function useAuth() {
  return React.useContext(AuthContext);
}

// Login Component
function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const result = await auth.login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={auth.loading}>
            {auth.loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Register Component
function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await auth.register(name, email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={auth.loading}>
            {auth.loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Auth Container Component
function AuthContainer() {
  const [activeTab, setActiveTab] = React.useState('login');

  return (
    <div className="auth-container">
      <div className="text-center mb-4">
        <h1 className="display-4">Balto</h1>
        <p className="lead">Logistics Management System</p>
      </div>
      <div className="auth-tabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </li>
        </ul>
      </div>
      {activeTab === 'login' ? <Login /> : <Register />}
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const auth = useAuth();
  const [activeSection, setActiveSection] = React.useState('loads');
  const [loads, setLoads] = React.useState([]);
  const [channels, setChannels] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch data on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch loads
        const loadsResponse = await axios.get('/api/loads');
        setLoads(loadsResponse.data.data || []);
        
        // Fetch channels
        const channelsResponse = await axios.get('/api/channels');
        setChannels(channelsResponse.data.data || []);
        
        // Fetch messages (using a placeholder user ID for demo)
        const messagesResponse = await axios.get('/api/messages/recipient/00000000-0000-0000-0000-000000000000');
        setMessages(messagesResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    auth.logout();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 sidebar d-none d-md-block">
          <div className="text-center mb-4">
            <h3>Balto</h3>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'loads' ? 'active' : ''}`}
                onClick={() => setActiveSection('loads')}
              >
                <i className="bi bi-truck"></i> Loads
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveSection('messages')}
              >
                <i className="bi bi-chat"></i> Messages
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'channels' ? 'active' : ''}`}
                onClick={() => setActiveSection('channels')}
              >
                <i className="bi bi-diagram-3"></i> Channels
              </button>
            </li>
            <li className="nav-item mt-auto">
              <button 
                className="nav-link"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 ms-auto">
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
              <span className="navbar-brand d-md-none">Balto</span>
              <div className="d-md-none">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Menu
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" onClick={() => setActiveSection('loads')}>Loads</button></li>
                  <li><button className="dropdown-item" onClick={() => setActiveSection('messages')}>Messages</button></li>
                  <li><button className="dropdown-item" onClick={() => setActiveSection('channels')}>Channels</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
              <div className="ms-auto">
                <span className="me-3">Welcome, {auth.user?.name || 'User'}</span>
              </div>
            </div>
          </nav>

          <div className="container">
            {/* Loads Section */}
            {activeSection === 'loads' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Loads</h2>
                  <button className="btn btn-primary">
                    <i className="bi bi-plus"></i> New Load
                  </button>
                </div>
                
                {loads.length === 0 ? (
                  <div className="alert alert-info">No loads found. Create a new load to get started.</div>
                ) : (
                  <div className="row">
                    {/* For demo purposes, we'll show placeholder loads */}
                    <div className="col-md-6 col-lg-4">
                      <div className="card load-item">
                        <div className="card-body">
                          <h5 className="card-title">Load #12345</h5>
                          <span className="badge badge-status-in-progress">In Progress</span>
                          <p className="card-text mt-2">From: Chicago, IL</p>
                          <p className="card-text">To: Detroit, MI</p>
                          <p className="card-text">Delivery: Aug 10, 2025</p>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-primary me-2">Details</button>
                            <button className="btn btn-sm btn-outline-secondary">Update</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card load-item">
                        <div className="card-body">
                          <h5 className="card-title">Load #12346</h5>
                          <span className="badge badge-status-new">New</span>
                          <p className="card-text mt-2">From: New York, NY</p>
                          <p className="card-text">To: Boston, MA</p>
                          <p className="card-text">Delivery: Aug 15, 2025</p>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-primary me-2">Details</button>
                            <button className="btn btn-sm btn-outline-secondary">Update</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card load-item">
                        <div className="card-body">
                          <h5 className="card-title">Load #12347</h5>
                          <span className="badge badge-status-completed">Completed</span>
                          <p className="card-text mt-2">From: Miami, FL</p>
                          <p className="card-text">To: Atlanta, GA</p>
                          <p className="card-text">Delivery: Aug 1, 2025</p>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-primary me-2">Details</button>
                            <button className="btn btn-sm btn-outline-secondary">Update</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Messages Section */}
            {activeSection === 'messages' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Messages</h2>
                  <button className="btn btn-primary">
                    <i className="bi bi-plus"></i> New Message
                  </button>
                </div>
                
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column" style={{ height: '400px', overflowY: 'auto' }}>
                      {/* For demo purposes, we'll show placeholder messages */}
                      <div className="message-item message-received">
                        <div className="small text-muted">John Doe • 10:30 AM</div>
                        <div>Hi there! I wanted to check on the status of load #12345.</div>
                      </div>
                      
                      <div className="message-item message-sent">
                        <div className="small text-muted">You • 10:35 AM</div>
                        <div>Hello! The load is currently in transit and on schedule for delivery.</div>
                      </div>
                      
                      <div className="message-item message-received">
                        <div className="small text-muted">John Doe • 10:40 AM</div>
                        <div>Great, thanks for the update. Can you let me know when it arrives?</div>
                      </div>
                      
                      <div className="message-item message-sent">
                        <div className="small text-muted">You • 10:42 AM</div>
                        <div>Absolutely, I'll keep you posted on any updates.</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Type your message..." />
                        <button className="btn btn-primary">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Channels Section */}
            {activeSection === 'channels' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Channels</h2>
                  <button className="btn btn-primary">
                    <i className="bi bi-plus"></i> New Channel
                  </button>
                </div>
                
                {channels.length === 0 ? (
                  <div className="alert alert-info">No channels found. Create a new channel to get started.</div>
                ) : (
                  <div className="row">
                    {/* For demo purposes, we'll show placeholder channels */}
                    <div className="col-md-6 col-lg-4">
                      <div className="card channel-item">
                        <div className="card-body">
                          <h5 className="card-title">General</h5>
                          <p className="card-text">General discussion channel for all team members.</p>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-primary">Join</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card channel-item">
                        <div className="card-body">
                          <h5 className="card-title">Dispatchers</h5>
                          <p className="card-text">Channel for dispatch team coordination.</p>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-primary">Join</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="card channel-item">
                        <div className="card-body">
                          <h5 className="card-title">Carriers</h5>
                          <p className="card-text">Channel for carrier communications.</p>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-outline-primary">Join</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return auth.isAuthenticated ? <Dashboard /> : <AuthContainer />;
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);