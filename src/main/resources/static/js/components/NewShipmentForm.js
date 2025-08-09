// New Shipment Form Component

function NewShipmentForm({ onCancel, onSubmit }) {
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
        if (formData.weight && isNaN(formData.weight) || parseFloat(formData.weight) <= 0) {
            newErrors.weight = 'Weight must be a positive number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="new-shipment-form-container">
            <div className="form-header">
                <h2>Create New Shipment</h2>
                <button className="close-btn" onClick={onCancel}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

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
                    <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="submit-btn">Create Shipment</button>
                </div>
            </form>
        </div>
    );
}
