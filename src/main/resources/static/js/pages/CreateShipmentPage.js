// Create Shipment Page Component
// Create Shipment Page Component

function CreateShipmentPage() {
    const auth = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '',
        deliveryLocation: '',
        deliveryDate: '',
        deliveryTime: '',
        vehicleCount: 1,
        vehicleType: 'car',
        specialInstructions: '',
        contactName: '',
        contactPhone: '',
        contactEmail: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // In production, this would call the API to create a shipment
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Shipment created successfully!');
            window.location.hash = '';
        } catch (error) {
            console.error('Error creating shipment:', error);
            alert('Error creating shipment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="shipment-form-container">
                <h1 className="form-title">Create New Shipment</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2 className="form-section-title">
                            <i className="bi bi-geo-alt"></i>
                            Pickup Information
                        </h2>
                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="pickupLocation">Pickup Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="pickupLocation"
                                        name="pickupLocation"
                                        value={formData.pickupLocation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="pickupDate">Pickup Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="pickupDate"
                                        name="pickupDate"
                                        value={formData.pickupDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="pickupTime">Pickup Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="pickupTime"
                                        name="pickupTime"
                                        value={formData.pickupTime}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section-title">
                            <i className="bi bi-pin-map"></i>
                            Delivery Information
                        </h2>
                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="deliveryLocation">Delivery Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="deliveryLocation"
                                        name="deliveryLocation"
                                        value={formData.deliveryLocation}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="deliveryDate">Expected Delivery Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="deliveryDate"
                                        name="deliveryDate"
                                        value={formData.deliveryDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="deliveryTime">Expected Delivery Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="deliveryTime"
                                        name="deliveryTime"
                                        value={formData.deliveryTime}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section-title">
                            <i className="bi bi-truck"></i>
                            Vehicle Information
                        </h2>
                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="vehicleType">Vehicle Type</label>
                                    <select
                                        className="form-control"
                                        id="vehicleType"
                                        name="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="car">Car</option>
                                        <option value="suv">SUV</option>
                                        <option value="pickup">Pickup Truck</option>
                                        <option value="van">Van</option>
                                        <option value="box_truck">Box Truck</option>
                                        <option value="semi">Semi-Truck</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="vehicleCount">Number of Vehicles</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="vehicleCount"
                                        name="vehicleCount"
                                        min="1"
                                        max="10"
                                        value={formData.vehicleCount}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section-title">
                            <i className="bi bi-person"></i>
                            Contact Information
                        </h2>
                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="contactName">Contact Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactName"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="contactPhone">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="contactPhone"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-col">
                                <div className="form-group">
                                    <label htmlFor="contactEmail">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="contactEmail"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section-title">
                            <i className="bi bi-info-circle"></i>
                            Additional Information
                        </h2>
                        <div className="form-group">
                            <label htmlFor="specialInstructions">Special Instructions</label>
                            <textarea
                                className="form-control"
                                id="specialInstructions"
                                name="specialInstructions"
                                rows="4"
                                value={formData.specialInstructions}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => window.location.hash = ''}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner mr-2"></span>
                                    Creating...
                                </>
                            ) : (
                                'Create Shipment'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <nav className="mobile-nav">
                <button className="nav-item active" onClick={() => window.location.hash = ''}>
                    📦
                    <span>Shipments</span>
                </button>
                <button className="nav-item" onClick={() => window.location.hash = 'messages'}>
                    💬
                    <span>Messages</span>
                </button>
                <button className="nav-item" onClick={() => window.location.hash = 'profile'}>
                    👤
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}
function CreateShipmentPage() {
    const auth = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        pickupLocation: '',
        pickupDate: '',
        deliveryLocation: '',
        deliveryDate: '',
        deliveryTime: '',
        shipmentType: 'standard',
        weight: '',
        notes: ''
    });
    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Required fields validation
        if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
        if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
        if (!formData.deliveryLocation) newErrors.deliveryLocation = 'Delivery location is required';
        if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
        if (!formData.deliveryTime) newErrors.deliveryTime = 'Delivery time is required';
        if (!formData.weight) newErrors.weight = 'Weight is required';

        // Date validation - ensure delivery date is after pickup date
        if (formData.pickupDate && formData.deliveryDate) {
            const pickup = new Date(formData.pickupDate);
            const delivery = new Date(formData.deliveryDate);

            if (delivery < pickup) {
                newErrors.deliveryDate = 'Delivery date must be after pickup date';
            }
        }

        // Weight validation - ensure it's a positive number
        if (formData.weight && (isNaN(formData.weight) || parseFloat(formData.weight) <= 0)) {
            newErrors.weight = 'Weight must be a positive number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);

            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                // Navigate back to shipments page
                window.location.hash = '';
            }, 1500);
        }
    };

    const handleCancel = () => {
        window.location.hash = '';
    };

    return (
        <div className="create-shipment-container">
            <div className="page-header">
                <button className="back-button" onClick={handleCancel}>
                    ←
                </button>
                <h1>Create New Shipment</h1>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Creating your shipment...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="shipment-form">
                    <div className="form-section">
                        <h3>Pickup Information</h3>

                        <div className="form-group">
                            <label htmlFor="pickupLocation">Pickup Location</label>
                            <input 
                                type="text" 
                                id="pickupLocation" 
                                name="pickupLocation" 
                                value={formData.pickupLocation} 
                                onChange={handleChange} 
                                className={errors.pickupLocation ? 'form-control error' : 'form-control'}
                                placeholder="Enter city, state"
                            />
                            {errors.pickupLocation && <div className="error-message">{errors.pickupLocation}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="pickupDate">Pickup Date</label>
                            <input 
                                type="date" 
                                id="pickupDate" 
                                name="pickupDate" 
                                value={formData.pickupDate} 
                                onChange={handleChange} 
                                className={errors.pickupDate ? 'form-control error' : 'form-control'}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.pickupDate && <div className="error-message">{errors.pickupDate}</div>}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Delivery Information</h3>

                        <div className="form-group">
                            <label htmlFor="deliveryLocation">Delivery Location</label>
                            <input 
                                type="text" 
                                id="deliveryLocation" 
                                name="deliveryLocation" 
                                value={formData.deliveryLocation} 
                                onChange={handleChange} 
                                className={errors.deliveryLocation ? 'form-control error' : 'form-control'}
                                placeholder="Enter city, state"
                            />
                            {errors.deliveryLocation && <div className="error-message">{errors.deliveryLocation}</div>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="deliveryDate">Delivery Date</label>
                                <input 
                                    type="date" 
                                    id="deliveryDate" 
                                    name="deliveryDate" 
                                    value={formData.deliveryDate} 
                                    onChange={handleChange} 
                                    className={errors.deliveryDate ? 'form-control error' : 'form-control'}
                                    min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                                />
                                {errors.deliveryDate && <div className="error-message">{errors.deliveryDate}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="deliveryTime">Delivery Time</label>
                                <input 
                                    type="time" 
                                    id="deliveryTime" 
                                    name="deliveryTime" 
                                    value={formData.deliveryTime} 
                                    onChange={handleChange} 
                                    className={errors.deliveryTime ? 'form-control error' : 'form-control'}
                                />
                                {errors.deliveryTime && <div className="error-message">{errors.deliveryTime}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Shipment Details</h3>

                        <div className="form-group">
                            <label htmlFor="shipmentType">Shipment Type</label>
                            <select 
                                id="shipmentType" 
                                name="shipmentType" 
                                value={formData.shipmentType} 
                                onChange={handleChange} 
                                className="form-control"
                            >
                                <option value="standard">Standard</option>
                                <option value="express">Express</option>
                                <option value="overnight">Overnight</option>
                                <option value="hazardous">Hazardous Material</option>
                                <option value="refrigerated">Refrigerated</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Weight (lbs)</label>
                            <input 
                                type="number" 
                                id="weight" 
                                name="weight" 
                                value={formData.weight} 
                                onChange={handleChange} 
                                className={errors.weight ? 'form-control error' : 'form-control'}
                                min="1"
                                step="0.1"
                            />
                            {errors.weight && <div className="error-message">{errors.weight}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Special Instructions (Optional)</label>
                            <textarea 
                                id="notes" 
                                name="notes" 
                                value={formData.notes} 
                                onChange={handleChange} 
                                className="form-control"
                                rows="3"
                                placeholder="Enter any special instructions for this shipment"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="submit-btn">Create Shipment</button>
                    </div>
                </form>
            )}
        </div>
    );
}
