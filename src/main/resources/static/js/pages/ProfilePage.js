// Profile Page Component

function ProfilePage() {
    const auth = useAuth();
    const [userData, setUserData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [editedName, setEditedName] = React.useState('');
    const [editedPhone, setEditedPhone] = React.useState('');
    const [editedLocation, setEditedLocation] = React.useState('');

    // Fetch user data on component mount
    React.useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            // Mock data for now, in production this would call the API
            setTimeout(() => {
                const mockUser = {
                    id: '12345',
                    name: auth.user?.name || 'John Doe',
                    email: auth.user?.email || 'john.doe@example.com',
                    phone: '(555) 123-4567',
                    location: 'New York, NY',
                    role: 'Customer',
                    joinDate: 'August 2023',
                    shipments: 12,
                    profileImage: null
                };

    // Fetch user data on component mount
    React.useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            // Mock data for now, in production this would call the API
            setTimeout(() => {
                const mockUser = {
                    id: '12345',
                    name: auth.user?.name || 'John Doe',
                    email: auth.user?.email || 'john.doe@example.com',
                    phone: '(555) 123-4567',
                    location: 'New York, NY',
                    role: 'Customer',
                    joinDate: 'August 2023',
                    shipments: 12,
                    profileImage: null
                };

                setUserData(mockUser);
                setEditedName(mockUser.name);
                setEditedPhone(mockUser.phone);
                setEditedLocation(mockUser.location);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        auth.logout();
        window.location.href = '/';
    };

    const handleSaveProfile = () => {
        // In production, this would call the API to update user data
        setUserData({
            ...userData,
            name: editedName,
            phone: editedPhone,
            location: editedLocation
        });
        setIsEditMode(false);
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="profile-container">
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading profile...</p>
                </div>
            ) : (
                <>
                    <div className="profile-header">
                        <div className="profile-image-container">
                            <div className="profile-image">{getInitials(userData.name)}</div>
                        </div>
                        <h1>{userData.name}</h1>
                        <p className="user-email">{userData.email}</p>
                    </div>

                    <div className="profile-sections">
                        {isEditMode ? (
                            <div className="profile-section edit-mode">
                                <div className="section-header">
                                    <h2>Edit Profile</h2>
                                </div>
                                <div className="edit-form">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            value={editedName} 
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input 
                                            type="tel" 
                                            value={editedPhone} 
                                            onChange={(e) => setEditedPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input 
                                            type="text" 
                                            value={editedLocation} 
                                            onChange={(e) => setEditedLocation(e.target.value)}
                                        />
                                    </div>
                                    <div className="edit-buttons">
                                        <button className="cancel-button" onClick={() => setIsEditMode(false)}>Cancel</button>
                                        <button className="save-button" onClick={handleSaveProfile}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="profile-section">
                                    <div className="section-header">
                                        <i className="bi bi-person"></i>
                                        <h2>Personal Information</h2>
                                        <button className="edit-button" onClick={() => setIsEditMode(true)}>Edit</button>
                                    </div>
                                    <div className="profile-details">
                                        <div className="detail-item">
                                            <div className="detail-label">Phone</div>
                                            <div className="detail-value">{userData.phone}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Location</div>
                                            <div className="detail-value">{userData.location}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Account Type</div>
                                            <div className="detail-value">{userData.role}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Member Since</div>
                                            <div className="detail-value">{userData.joinDate}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-section">
                                    <div className="section-header">
                                        <i className="bi bi-truck"></i>
                                        <h2>Shipping Activity</h2>
                                    </div>
                                    <div className="profile-details">
                                        <div className="detail-item">
                                            <div className="detail-label">Total Shipments</div>
                                            <div className="detail-value">{userData.shipments}</div>
                                        </div>
                                        <div className="shipping-statistics">
                                            <div className="stat-item">
                                                <div className="stat-value">98%</div>
                                                <div className="stat-label">On-time delivery</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-value">4.9</div>
                                                <div className="stat-label">Rating</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-section">
                                    <div className="section-header">
                                        <i className="bi bi-shield-check"></i>
                                        <h2>Account Security</h2>
                                    </div>
                                    <ul className="profile-menu">
                                        <li className="menu-item">
                                            <span>Change Password</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </li>
                                        <li className="menu-item">
                                            <span>Two-Factor Authentication</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </li>
                                        <li className="menu-item">
                                            <span>Privacy Settings</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </li>
                                    </ul>
                                </div>

                                <button className="logout-button" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}

            <nav className="mobile-nav">
                <button className="nav-item" onClick={() => window.location.hash = ''}>
                    📦
                    <span>Shipments</span>
                </button>
                <button className="nav-item" onClick={() => window.location.hash = 'messages'}>
                    💬
                    <span>Messages</span>
                </button>
                <button className="nav-item active">
                    👤
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="profile-container">
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading profile...</p>
                </div>
            ) : (
                <>
                    <div className="profile-header">
                        <div className="profile-image-container">
                            <div className="profile-image">{getInitials(userData.name)}</div>
                        </div>
                        <h1>{userData.name}</h1>
                        <p className="user-email">{userData.email}</p>
                    </div>

                    <div className="profile-sections">
                        {isEditMode ? (
                            <div className="profile-section edit-mode">
                                <div className="section-header">
                                    <h2>Edit Profile</h2>
                                </div>
                                <div className="edit-form">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            value={editedName} 
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input 
                                            type="tel" 
                                            value={editedPhone} 
                                            onChange={(e) => setEditedPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input 
                                            type="text" 
                                            value={editedLocation} 
                                            onChange={(e) => setEditedLocation(e.target.value)}
                                        />
                                    </div>
                                    <div className="edit-buttons">
                                        <button className="cancel-button" onClick={() => setIsEditMode(false)}>Cancel</button>
                                        <button className="save-button" onClick={handleSaveProfile}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="profile-section">
                                    <div className="section-header">
                                        <i className="bi bi-person"></i>
                                        <h2>Personal Information</h2>
                                        <button className="edit-button" onClick={() => setIsEditMode(true)}>Edit</button>
                                    </div>
                                    <div className="profile-details">
                                        <div className="detail-item">
                                            <div className="detail-label">Phone</div>
                                            <div className="detail-value">{userData.phone}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Location</div>
                                            <div className="detail-value">{userData.location}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Account Type</div>
                                            <div className="detail-value">{userData.role}</div>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">Member Since</div>
                                            <div className="detail-value">{userData.joinDate}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-section">
                                    <div className="section-header">
                                        <i className="bi bi-truck"></i>
                                        <h2>Shipping Activity</h2>
                                    </div>
                                    <div className="profile-details">
                                        <div className="detail-item">
                                            <div className="detail-label">Total Shipments</div>
                                            <div className="detail-value">{userData.shipments}</div>
                                        </div>
                                        <div className="shipping-statistics">
                                            <div className="stat-item">
                                                <div className="stat-value">98%</div>
                                                <div className="stat-label">On-time delivery</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-value">4.9</div>
                                                <div className="stat-label">Rating</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-section">
                                    <div className="section-header">
                                        <i className="bi bi-shield-check"></i>
                                        <h2>Account Security</h2>
                                    </div>
                                    <ul className="profile-menu">
                                        <li className="menu-item">
                                            <span>Change Password</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </li>
                                        <li className="menu-item">
                                            <span>Two-Factor Authentication</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </li>
                                        <li className="menu-item">
                                            <span>Privacy Settings</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}

                        <button className="logout-button" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </>
            )}

            <nav className="mobile-nav">
                <button className="nav-item" onClick={() => window.location.hash = ''}>
                    📦
                    <span>Shipments</span>
                </button>
                <button className="nav-item" onClick={() => window.location.hash = 'messages'}>
                    💬
                    <span>Messages</span>
                </button>
                <button className="nav-item active">
                    👤
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}
