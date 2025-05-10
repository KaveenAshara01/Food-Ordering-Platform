import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Use import instead of require

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Driver schema
const driverSchema = new mongoose.Schema({
  name: String,
  licenseNumber: String,
  vehicleType: String,
});

const Driver = mongoose.model('Driver', driverSchema);

// Routes
app.post('/drivers', async (req, res) => {
  try {
    const { name, licenseNumber, vehicleType } = req.body;
    const newDriver = new Driver({ name, licenseNumber, vehicleType });
    await newDriver.save();
    res.status(201).json({ message: 'Driver added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching drivers' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Driver service running on port ${PORT}`));
