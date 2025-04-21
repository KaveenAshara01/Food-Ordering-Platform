import React, { useState } from 'react';
import axios from 'axios';

function DriverRegister() {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    vehicleType: '',
  });

  const [drivers, setDrivers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/drivers', formData);
      alert(response.data.message);
      fetchDrivers(); // Refresh the driver list
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/drivers');
      setDrivers(response.data);
    } catch (err) {
      alert('Error fetching drivers: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Driver Registration</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Driver Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register Driver</button>
      </form>

      <button onClick={fetchDrivers}>Fetch Drivers</button>

      <h2>Registered Drivers</h2>
      <ul>
        {drivers.map((driver) => (
          <li key={driver._id}>
            {driver.name} - {driver.licenseNumber} - {driver.vehicleType}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverRegister;