// HomePage.js - Main landing page for Balto application

function HomePage() {
  const [activeShipments, setActiveShipments] = React.useState([]);
  const [recentShipments, setRecentShipments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const auth = useAuth();

  React.useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // Mock data for demonstration
        const mockActiveShipment = {
          id: "SHIP-1234",
          status: "IN_TRANSIT",
          pickup: {
            address: "123 Main St, Seattle, WA",
            date: "2025-08-05T09:00:00"
          },
          delivery: {
            address: "456 Pine Ave, Portland, OR",
            date: "2025-08-08T14:00:00"
          },
          carrier: {
            name: "FastTruck Logistics",
            phone: "+1 (555) 123-4567"
          },
          eta: {
            date: "2025-08-08",
            time: "14:00",
            status: "On schedule"
          }
        };

        const mockRecentShipments = [
          {
            id: "SHIP-1122",
            status: "DELIVERED",
            pickup: "Seattle, WA",
            delivery: "Portland, OR",
            date: "2025-08-01"
          },
          {
            id: "SHIP-1098",
            status: "CANCELLED",
            pickup: "San Francisco, CA",
            delivery: "Los Angeles, CA",
            date: "2025-07-28"
          },
          {
            id: "SHIP-1056",
            status: "DELIVERED",
            pickup: "Boston, MA",
            delivery: "New York, NY",
            date: "2025-07-25"
          }
        ];

        setActiveShipments([mockActiveShipment]);
        setRecentShipments(mockRecentShipments);

      } catch (err) {
        console.error('Error fetching shipments:', err);
        setError('Failed to load shipments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to get status styling
  const getStatusStyle = (status) => {
    switch(status) {
      case 'DELIVERED':
        return { color: 'var(--success-color)' };
      case 'IN_TRANSIT':
        return { color: 'var(--accent-color)' };
      case 'CANCELLED':
        return { color: 'var(--danger-color)' };
      default:
        return { color: 'var(--primary-color)' };
    }
  };

  return (
    <div className="app-container bg-light">
      <header className="py-4 bg-primary text-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">Balto</h1>
            <div className="d-flex align-items-center">
              <span className="me-3">{auth.user?.name || 'Guest'}</span>
              {auth.user ? (
                <button className="btn btn-sm btn-outline-light" onClick={auth.logout}>
                  Logout
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-light">Login</button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container py-4">
        <h2 className="mb-4 display-6">Welcome to Balto</h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your shipments...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            {/* Active Shipment Section */}
            <section className="mb-5">
              <h3 className="h5 mb-4">Active Shipment</h3>

              {activeShipments.length > 0 ? (
                activeShipments.map(shipment => (
                  <div key={shipment.id} className="card shadow-sm border-0 mb-4">
                    <div className="card-header bg-white py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="badge bg-primary me-2">#{shipment.id}</span>
                          <span style={getStatusStyle(shipment.status)}>{shipment.status.replace('_', ' ')}</span>
                        </div>
                        <button className="btn btn-sm btn-outline-primary">Details</button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row mb-4">
                        <div className="col-5">
                          <h6 className="text-muted">Pickup</h6>
                          <p className="mb-1">{shipment.pickup.address}</p>
                          <small className="text-muted">{formatDate(shipment.pickup.date)}</small>
                        </div>
                        <div className="col-2 text-center">
                          <i className="bi bi-arrow-right text-muted fs-4"></i>
                        </div>
                        <div className="col-5 text-end">
                          <h6 className="text-muted">Delivery</h6>
                          <p className="mb-1">{shipment.delivery.address}</p>
                          <small className="text-muted">{formatDate(shipment.delivery.date)}</small>
                        </div>
                      </div>

                      <div className="row border-top pt-3">
                        <div className="col-md-6">
                          <h6 className="mb-2">Estimated Delivery</h6>
                          <p className="mb-1 fw-bold">{formatDate(shipment.eta.date)} at {shipment.eta.time}</p>
                          <span className="text-success small">{shipment.eta.status}</span>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-end">
                          <button className="btn btn-primary">
                            <i className="bi bi-chat-dots me-2"></i>
                            Message Driver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center py-5">
                    <i className="bi bi-truck text-muted fs-1 mb-3 d-block"></i>
                    <h5>No Active Shipments</h5>
                    <p className="text-muted">You don't have any active shipments right now</p>
                    <a href="/shipments/new" className="btn btn-primary mt-2">
                      Create New Shipment
                    </a>
                  </div>
                </div>
              )}
            </section>

            {/* Recent Shipments Section */}
            <section>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h5 mb-0">Recent Shipments</h3>
                <a href="/shipments" className="btn btn-sm btn-outline-primary">View All</a>
              </div>

              {recentShipments.length > 0 ? (
                <div className="list-group shadow-sm">
                  {recentShipments.map(shipment => (
                    <a 
                      key={shipment.id} 
                      href={`/shipments/${shipment.id}`} 
                      className="list-group-item list-group-item-action border-0 py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-1">#{shipment.id}</h6>
                        <span style={getStatusStyle(shipment.status)}>{shipment.status.replace('_', ' ')}</span>
                      </div>
                      <div className="d-flex align-items-center my-1">
                        <span className="text-truncate">{shipment.pickup}</span>
                        <i className="bi bi-arrow-right mx-2 text-muted small"></i>
                        <span className="text-truncate">{shipment.delivery}</span>
                      </div>
                      <small className="text-muted">{formatDate(shipment.date)}</small>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center py-4">
                    <p className="text-muted mb-0">No recent shipments found</p>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed-bottom bg-white border-top py-2">
        <div className="container">
          <div className="row text-center">
            <div className="col-4">
              <a href="/" className="text-primary d-block py-1">
                <i className="bi bi-house-door fs-5 d-block mb-1"></i>
                <small>Home</small>
              </a>
            </div>
            <div className="col-4">
              <a href="/shipments" className="text-muted d-block py-1">
                <i className="bi bi-truck fs-5 d-block mb-1"></i>
                <small>Shipments</small>
              </a>
            </div>
            <div className="col-4">
              <a href="/profile" className="text-muted d-block py-1">
                <i className="bi bi-person fs-5 d-block mb-1"></i>
                <small>Profile</small>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
