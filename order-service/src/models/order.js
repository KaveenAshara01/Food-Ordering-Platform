import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'preparing', 'ready', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default model('Order', orderSchema);