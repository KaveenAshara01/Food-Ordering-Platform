import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Restaurant', restaurantSchema);