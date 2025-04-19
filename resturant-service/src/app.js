import express, { json } from 'express';
import { connect } from 'mongoose';
import restaurantRoutes from './routes/restaurantRoutes';

const app = express();

app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/restaurant', restaurantRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});