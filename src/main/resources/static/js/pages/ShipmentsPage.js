// Shipments Page Component

function ShipmentsPage() {
    return (
        <div className="shipments-container">
            <div className="shipments-header">
                <h1>Your Shipments</h1>
            </div>

            <div className="active-shipment-card">
                <div className="shipment-card-header">
                    <span className="shipment-label">Active Shipment</span>
                    <span className="shipment-id">#12345</span>
                </div>

                <div className="shipment-details">
                    <div className="location-container">
                        <div className="pickup-location">
                            <h3>Chicago, IL</h3>
                            <p>Pickup: Aug 7, 2025</p>
                        </div>

                        <div className="shipment-icon">
                            <i className="bi bi-truck"></i>
                        </div>

                        <div className="delivery-location">
                            <h3>Detroit, MI</h3>
                            <p>Delivery: Aug 9, 2025</p>
                        </div>
                    </div>

                    <div className="shipment-info-section">
                        <div className="eta-section">
                            <h4>Estimated Time of Arrival</h4>
                            <p className="eta-time">Aug 9, 10:30 AM</p>
                            <p className="eta-status">On schedule</p>
                        </div>

                        <button className="message-driver-btn">
                            Message Driver
                        </button>
                    </div>
                </div>
            </div>

            <div className="recent-shipments-section">
                <h2>Recent Shipments</h2>

                <div className="recent-shipment-item">
                    <div className="shipment-summary">
                        <div className="shipment-id-badge">#12344</div>
                        <div className="shipment-status">Delivered</div>
                    </div>
                    <div className="shipment-route">
                        <span className="origin">New York, NY</span>
                        <i className="bi bi-arrow-right"></i>
                        <span className="destination">Boston, MA</span>
                    </div>
                    <div className="shipment-date">Aug 5, 2025</div>
                </div>

                <div className="recent-shipment-item">
                    <div className="shipment-summary">
                        <div className="shipment-id-badge">#12343</div>
                        <div className="shipment-status">Delivered</div>
                    </div>
                    <div className="shipment-route">
                        <span className="origin">Miami, FL</span>
                        <i className="bi bi-arrow-right"></i>
                        <span className="destination">Atlanta, GA</span>
                    </div>
                    <div className="shipment-date">Aug 1, 2025</div>
                </div>
            </div>

            <nav className="mobile-nav">
                <button className="nav-item active">
                    <i className="bi bi-box-seam"></i>
                    <span>Shipments</span>
                </button>
                <button className="nav-item">
                    <i className="bi bi-chat"></i>
                    <span>Messages</span>
                </button>
                <button className="nav-item">
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}
