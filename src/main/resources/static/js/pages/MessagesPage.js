// Messages Page Component

function MessagesPage() {
    return (
        <div className="messages-container">
            <div className="messages-header">
                <h1>Messages</h1>
            </div>

            <div className="messages-list">
                <div className="message-thread active">
                    <div className="avatar-container">
                        <div className="avatar">JD</div>
                    </div>
                    <div className="message-preview">
                        <div className="message-info">
                            <h3 className="contact-name">John Driver</h3>
                            <span className="message-time">10:30 AM</span>
                        </div>
                        <p className="message-snippet">I'll be arriving at the pickup location in about 15 minutes.</p>
                    </div>
                </div>

                <div className="message-thread">
                    <div className="avatar-container">
                        <div className="avatar">SD</div>
                    </div>
                    <div className="message-preview">
                        <div className="message-info">
                            <h3 className="contact-name">Sarah Dispatcher</h3>
                            <span className="message-time">Yesterday</span>
                        </div>
                        <p className="message-snippet">Your shipment #12344 has been delivered successfully.</p>
                    </div>
                </div>

                <div className="message-thread">
                    <div className="avatar-container">
                        <div className="avatar">MC</div>
                    </div>
                    <div className="message-preview">
                        <div className="message-info">
                            <h3 className="contact-name">Mike Coordinator</h3>
                            <span className="message-time">Aug 3</span>
                        </div>
                        <p className="message-snippet">We've assigned your new shipment to our top driver.</p>
                    </div>
                </div>

                <div className="message-thread">
                    <div className="avatar-container">
                        <div className="avatar">TS</div>
                    </div>
                    <div className="message-preview">
                        <div className="message-info">
                            <h3 className="contact-name">Tom Support</h3>
                            <span className="message-time">Aug 1</span>
                        </div>
                        <p className="message-snippet">Thanks for reaching out. How can I assist you today?</p>
                    </div>
                </div>
            </div>

            <nav className="mobile-nav">
                <button className="nav-item">
                    <i className="bi bi-box-seam"></i>
                    <span>Shipments</span>
                </button>
                <button className="nav-item active">
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
