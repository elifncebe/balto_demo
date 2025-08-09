// Shipments Page Component

function HomePage() {
    const auth = useAuth();
    const [loads, setLoads] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // Fetch loads on component mount
    React.useEffect(() => {
        fetchLoads();
    }, []);

    const fetchLoads = async () => {
        try {
            setIsLoading(true);
            // Mock data for now, in production this would call the API
            setTimeout(() => {
                setLoads([
                    { 
                        id: '12345',
                        status: 'In Transit',
                        pickup: { location: 'Chicago, IL', date: 'Aug 7, 2025' },
                        delivery: { location: 'Detroit, MI', date: 'Aug 9, 2025' },
                        eta: 'Aug 9, 10:30 AM',
                        isOnSchedule: true
                    },
                    { 
                        id: '12344',
                        status: 'Delivered',
                        pickup: { location: 'New York, NY', date: 'Aug 3, 2025' },
                        delivery: { location: 'Boston, MA', date: 'Aug 5, 2025' },
                        eta: 'Aug 5, 2:15 PM',
                        isOnSchedule: true
                    },
                    { 
                        id: '12343',
                        status: 'Delivered',
                        pickup: { location: 'Miami, FL', date: 'Jul 29, 2025' },
                        delivery: { location: 'Atlanta, GA', date: 'Aug 1, 2025' },
                        eta: 'Aug 1, 4:00 PM',
                        isOnSchedule: true
                    }
                ]);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching loads:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="shipments-container">
            <div className="shipments-header">
                <h1>Your Shipments</h1>
                <p className="welcome-text">Welcome back, {auth.user?.name || 'User'}</p>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your shipments...</p>
                </div>
            ) : (
                <>
                    {loads.length > 0 && (
                        <div className="active-shipment-card">
                <div className="shipment-card-header">
                    <span className="shipment-label">Active Shipment</span>
                    <span className="shipment-id">ID: #{loads[0].id}</span>
                </div>

                <div className="shipment-details">
                    <div className="location-container">
                        <div className="pickup-location">
                            <h3>{loads[0].pickup.location}</h3>
                            <p>Pickup: {loads[0].pickup.date}</p>
                        </div>

                        <div className="shipment-icon">
                            <i className="bi bi-truck"></i>
                        </div>

                        <div className="delivery-location">
                            <h3>{loads[0].delivery.location}</h3>
                            <p>Delivery: {loads[0].delivery.date}</p>
                        </div>
                    </div>

                    <div className="shipment-info-section">
                        <div className="eta-section">
                            <h4>Estimated Time of Arrival</h4>
                            <p className="eta-time">{loads[0].eta}</p>
                            <p className="eta-status">{loads[0].isOnSchedule ? 'On schedule' : 'Delayed'}</p>
                        </div>

                        <button className="message-driver-btn" onClick={() => window.location.href = '/messages'}>
                            Message Driver
                        </button>
                    </div>
                </div>
            </div>
                    )}

                    <div className="recent-shipments-section">
                        <h2>Recent Shipments</h2>

                        {loads.slice(1).map((load, index) => (
                            <div className="recent-shipment-item" key={load.id}>
                                <div className="shipment-summary">
                                    <div className="shipment-id-badge">#{load.id}</div>
                                    <div className="shipment-status">{load.status}</div>
                                </div>
                                <div className="shipment-route">
                                    <span className="origin">{load.pickup.location}</span>
                                    <i className="bi bi-arrow-right"></i>
                                    <span className="destination">{load.delivery.location}</span>
                                </div>
                                <div className="shipment-date">{load.delivery.date}</div>
                            </div>
                        ))}

                        <button className="create-shipment-btn" onClick={() => window.location.href = '/create-shipment'}>
                            Create New Shipment
                        </button>
                    </div>
                </>
            )}
            <nav className="mobile-nav">
                <button className="nav-item active">
                    <i className="bi bi-box-seam"></i>
                    <span>Shipments</span>
                </button>
                <button className="nav-item" onClick={() => window.location.hash = 'messages'}>
                    <i className="bi bi-chat-dots"></i>
                    <span>Messages</span>
                </button>
                <button className="nav-item" onClick={() => window.location.hash = 'profile'}>
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}
