import express, { json } from 'express';
import { connect } from 'mongoose';
import deliveryRoutes from './routes/deliveryRoutes';

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
app.use('/api/delivery', deliveryRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Delivery Service running on port ${PORT}`);
});