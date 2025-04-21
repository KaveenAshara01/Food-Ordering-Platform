import { Schema, model } from 'mongoose';

const deliverySchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  deliveryPersonId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['assigned', 'picked-up', 'delivered'], default: 'assigned' },
  assignedAt: { type: Date, default: Date.now },
});

export default model('Delivery', deliverySchema);