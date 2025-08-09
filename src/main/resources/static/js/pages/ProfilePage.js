// Profile Page Component

function ProfilePage() {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image-container">
                    <div className="profile-image">JD</div>
                </div>
                <h1>John Doe</h1>
                <p className="user-email">john.doe@example.com</p>
            </div>

            <div className="profile-sections">
                <div className="profile-section">
                    <div className="section-header">
                        <i className="bi bi-person"></i>
                        <h2>Account</h2>
                    </div>
                    <ul className="profile-menu">
                        <li className="menu-item">
                            <span>Personal Information</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                        <li className="menu-item">
                            <span>Payment Methods</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                        <li className="menu-item">
                            <span>Addresses</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                        <li className="menu-item">
                            <span>Password & Security</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                    </ul>
                </div>

                <div className="profile-section">
                    <div className="section-header">
                        <i className="bi bi-gear"></i>
                        <h2>Preferences</h2>
                    </div>
                    <ul className="profile-menu">
                        <li className="menu-item">
                            <span>Notifications</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                        <li className="menu-item">
                            <span>Language</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                    </ul>
                </div>

                <div className="profile-section">
                    <div className="section-header">
                        <i className="bi bi-question-circle"></i>
                        <h2>Support</h2>
                    </div>
                    <ul className="profile-menu">
                        <li className="menu-item">
                            <span>Help Center</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                        <li className="menu-item">
                            <span>Contact Support</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                        <li className="menu-item">
                            <span>Terms of Service</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                        <li className="menu-item">
                            <span>Privacy Policy</span>
                            <i className="bi bi-chevron-right"></i>
                        </li>
                    </ul>
                </div>

                <button className="logout-button">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </button>
            </div>

            <nav className="mobile-nav">
                <button className="nav-item">
                    <i className="bi bi-box-seam"></i>
                    <span>Shipments</span>
                </button>
                <button className="nav-item">
                    <i className="bi bi-chat"></i>
                    <span>Messages</span>
                </button>
                <button className="nav-item active">
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}
