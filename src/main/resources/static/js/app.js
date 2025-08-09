// Main React application for Balto

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Simple hash-based router
function useRouter() {
  const [currentRoute, setCurrentRoute] = React.useState(window.location.hash.slice(1) || '');

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || '');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return currentRoute;
}

// Create a React context for authentication
const AuthContext = React.createContext(null);

// Provider component for authentication
function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [isInitialized, setIsInitialized] = React.useState(false);

    // Check for existing authentication on component mount
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (e) {
                console.error('Error parsing stored user data:', e);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }

        setIsInitialized(true);
    }, []);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/auth/login', 
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const { data } = response.data;

            if (data && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                setUser(data.user);
                return { success: true };
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Login error:', err);
            let message = 'An error occurred during login';

            if (err.response) {
                // The request was made and the server responded with an error status
                if (err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
                    message = err.response.data.errors[0].message || message;
                } else if (err.response.data && err.response.data.message) {
                    message = err.response.data.message;
                } else if (err.response.status === 401) {
                    message = 'Invalid email or password';
                }
            } else if (err.request) {
                // The request was made but no response was received
                message = 'No response from server. Please try again later.';
            }

            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/auth/signup', 
                { name, email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const { data } = response.data;

            if (data) {
                // Automatically log in after successful registration
                return await login(email, password);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Registration error:', err);
            let message = 'An error occurred during registration';

            if (err.response) {
                if (err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
                    message = err.response.data.errors[0].message || message;
                } else if (err.response.data && err.response.data.message) {
                    message = err.response.data.message;
                }
            } else if (err.request) {
                message = 'No response from server. Please try again later.';
            }

            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const contextValue = {
        user,
        loading,
        error,
        isInitialized,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Import the page components
// These would normally be in separate files, but we're including them directly for simplicity
// HomePage, ShipmentsPage, MessagesPage, and ProfilePage are defined in their respective files

// Login component
function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const auth = useAuth();

    React.useEffect(() => {
        if (auth.error) {
            setErrorMessage(auth.error);
        }
    }, [auth.error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage('Please enter both email and password');
            return;
        }

        const result = await auth.login(email, password);
        if (!result.success) {
            setErrorMessage(result.message);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Balto</h2>

            {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 flex justify-center items-center"
                    disabled={auth.loading}
                >
                    {auth.loading ? (
                        <>
                            <div className="loading-spinner mr-2"></div>
                            Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
}

// Register component
function Register() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const auth = useAuth();

    React.useEffect(() => {
        if (auth.error) {
            setErrorMessage(auth.error);
        }
    }, [auth.error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            return;
        }

        const result = await auth.register(name, email, password);
        if (!result.success) {
            setErrorMessage(result.message);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

            {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="register-email">
                        Email Address
                    </label>
                    <input
                        id="register-email"
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="register-password">
                        Password
                    </label>
                    <input
                        id="register-password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <input
                        id="confirm-password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 flex justify-center items-center"
                    disabled={auth.loading}
                >
                    {auth.loading ? (
                        <>
                            <div className="loading-spinner mr-2"></div>
                            Creating Account...
                        </>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </form>
        </div>
    );
}

// Load the components from their files
// This would be done by a bundler in a real app
function loadExternalComponents() {
    // Add script tags to load the components
    const shipmentsScript = document.createElement('script');
    shipmentsScript.src = '/js/pages/ShipmentsPage.js';
    shipmentsScript.type = 'text/babel';

    const messagesScript = document.createElement('script');
    messagesScript.src = '/js/pages/MessagesPage.js';
    messagesScript.type = 'text/babel';

    const profileScript = document.createElement('script');
    profileScript.src = '/js/pages/ProfilePage.js';
    profileScript.type = 'text/babel';

    document.body.appendChild(shipmentsScript);
    document.body.appendChild(messagesScript);
    document.body.appendChild(profileScript);

    // Return a promise that resolves when all scripts are loaded
    return new Promise((resolve) => {
        let loadedCount = 0;
        const totalScripts = 3;

        const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount === totalScripts) {
                resolve();
            }
        };

        shipmentsScript.onload = checkAllLoaded;
        messagesScript.onload = checkAllLoaded;
        profileScript.onload = checkAllLoaded;
    });
}

// Main App component with navigation
function App() {
    const [currentPage, setCurrentPage] = React.useState('shipments');
    const auth = useAuth();

    // Parse hash route from URL on mount and when hash changes
    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash === 'messages') {
                setCurrentPage('messages');
            } else if (hash === 'profile') {
                setCurrentPage('profile');
            } else {
                setCurrentPage('shipments');
            }
        };

        // Set initial page based on hash
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Update hash when page changes
    React.useEffect(() => {
        window.location.hash = currentPage === 'shipments' ? '' : currentPage;
    }, [currentPage]);

    // If still loading auth state, show loading
    if (!auth.isInitialized) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading application...</p>
            </div>
        );
    }

    // If not authenticated, show auth pages
    if (!auth.user) {
        return (
            <div className="auth-container">
                <div className="auth-tabs">
                    <ul className="nav nav-tabs mb-4" id="authTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">Login</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">Register</button>
                        </li>
                    </ul>
                </div>

                <div className="tab-content" id="authTabContent">
                    <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                        <Login />
                    </div>
                    <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                        <Register />
                    </div>
                </div>
            </div>
        );
    }

    // Authenticated user, show the appropriate page
    let currentPageComponent;
    switch(currentPage) {
        case 'shipments':
            // Import this component from ShipmentsPage.js
            currentPageComponent = <ShipmentsPage />;
            break;
        case 'messages':
            // Import this component from MessagesPage.js
            currentPageComponent = <MessagesPage />;
            break;
        case 'profile':
            // Import this component from ProfilePage.js
            currentPageComponent = <ProfilePage />;
            break;
        case 'create-shipment':
            // Import this component from CreateShipmentPage.js
            currentPageComponent = <CreateShipmentPage />;
            break;
        default:
            currentPageComponent = <ShipmentsPage />;
    }

    return (
        <div className="app-container">
            {currentPageComponent}
        </div>
    );
}

// Render the App
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load external components first
        await loadExternalComponents();

        // Then render the app
        const rootElement = document.getElementById('app');
        const root = ReactDOM.createRoot(rootElement);

        root.render(
            <AuthProvider>
                <App />
            </AuthProvider>
        );
    } catch (error) {
        console.error('Error initializing application:', error);
        document.getElementById('app').innerHTML = `
            <div class="alert alert-danger">
                <h4>Application Error</h4>
                <p>Failed to initialize the application. Please try again later.</p>
                <p><small>${error.message}</small></p>
            </div>
        `;
    }
});

// Dashboard component
function Dashboard() {
    const auth = useAuth();
    const [activeTab, setActiveTab] = React.useState('loads');
    const [loads, setLoads] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [channels, setChannels] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // Fetch data based on active tab
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data = [];

                switch (activeTab) {
                    case 'loads':
                        // Mock data for loads
                        data = [
                            { id: 1, name: 'Load #12345', status: 'In Transit', origin: 'New York, NY', destination: 'Boston, MA', eta: '2025-08-05' },
                            { id: 2, name: 'Load #12346', status: 'Delivered', origin: 'Chicago, IL', destination: 'Detroit, MI', eta: '2025-08-03' },
                            { id: 3, name: 'Load #12347', status: 'Pending', origin: 'San Francisco, CA', destination: 'Los Angeles, CA', eta: '2025-08-06' },
                        ];
                        setLoads(data);
                        break;

                    case 'messages':
                        // Mock data for messages
                        data = [
                            { id: 1, from: 'John Doe', subject: 'Load #12345 Update', content: 'The load will arrive earlier than expected.', date: '2025-08-03' },
                            { id: 2, from: 'Jane Smith', subject: 'New Assignment', content: 'You have been assigned a new load.', date: '2025-08-02' },
                            { id: 3, from: 'System', subject: 'Welcome', content: 'Welcome to the Balto Logistics Management System!', date: '2025-08-01' },
                        ];
                        setMessages(data);
                        break;

                    case 'channels':
                        // Mock data for channels
                        data = [
                            { id: 1, name: 'Team Alpha', members: 5, lastActivity: '10 minutes ago' },
                            { id: 2, name: 'East Coast Operations', members: 8, lastActivity: '2 hours ago' },
                            { id: 3, name: 'Driver Updates', members: 15, lastActivity: '1 day ago' },
                        ];
                        setChannels(data);
                        break;

                    default:
                        break;
                }
            } catch (error) {
                console.error(`Error fetching ${activeTab}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-indigo-600 text-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Balto Logistics</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">{auth.user?.name || 'User'}</span>
                        <button 
                            onClick={handleLogout}
                            className="bg-indigo-500 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded-md transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                className={`${activeTab === 'loads' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                                onClick={() => setActiveTab('loads')}
                            >
                                Loads
                            </button>
                            <button
                                className={`${activeTab === 'messages' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                                onClick={() => setActiveTab('messages')}
                            >
                                Messages
                            </button>
                            <button
                                className={`${activeTab === 'channels' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                                onClick={() => setActiveTab('channels')}
                            >
                                Channels
                            </button>
                        </nav>
                    </div>

                    {/* Tab content */}
                    <div className="bg-white shadow rounded-lg p-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="loading-spinner"></div>
                                <p className="ml-3 text-gray-600">Loading...</p>
                            </div>
                        ) : activeTab === 'loads' ? (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800">Your Loads</h2>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm">
                                        New Load
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {loads.length > 0 ? (
                                                loads.map((load) => (
                                                    <tr key={load.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{load.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{load.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${load.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : load.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                {load.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{load.origin}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{load.destination}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{load.eta}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                                            <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No loads found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : activeTab === 'messages' ? (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm">
                                        New Message
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {messages.length > 0 ? (
                                        messages.map((message) => (
                                            <div key={message.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                                                <div className="flex justify-between mb-2">
                                                    <h3 className="text-md font-medium text-gray-900">{message.subject}</h3>
                                                    <span className="text-sm text-gray-500">{message.date}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">From: {message.from}</p>
                                                <p className="text-sm text-gray-600">{message.content}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">No messages found</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800">Communication Channels</h2>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm">
                                        Create Channel
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {channels.length > 0 ? (
                                        channels.map((channel) => (
                                            <div key={channel.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                                                <h3 className="text-md font-medium text-gray-900 mb-2">{channel.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{channel.members} members</p>
                                                <p className="text-xs text-gray-500">Last activity: {channel.lastActivity}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 col-span-3">No channels found</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">© 2025 Balto Logistics. All rights reserved.</p>
                        <p className="text-sm text-gray-500">
                            <a href="/shutdown" className="text-indigo-600 hover:text-indigo-800">Terminate Application</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Auth page component that switches between login and register
function AuthPage() {
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-4">Balto Logistics</h1>
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    {isLogin ? 'Sign in to your account' : 'Create a new account'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    {isLogin ? 'New to Balto?' : 'Already have an account?'}{' '}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                    >
                        {isLogin ? 'Create an account' : 'Sign in'}
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                {isLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
}

// Main App component
function App() {
    const auth = useAuth();

    // Show loading state while checking authentication
    if (!auth.isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="loading-spinner"></div>
                <p className="ml-3 text-gray-600">Loading...</p>
            </div>
        );
    }

    return auth.user ? <Dashboard /> : <AuthPage />;
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
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
                                          onClick={() => setActivePage('home')} 
                                          className={`btn btn-link nav-link text-center py-3 ${activePage === 'home' ? 'active' : ''}`}
                                      >
                                          <i className="bi bi-house-door d-block"></i>
                                          <small>Home</small>
                                      </button>
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