import Order, { findById, find } from '../models/order';

export async function placeOrder(req, res) {
  try {
    const { restaurantId, items } = req.body;
    const customerId = req.user.id;

    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Only customers can place orders' });
    }

    const totalPrice = items.reduce((total, item) => total + (item.quantity * item.price), 0);
    const order = new Order({ customerId, restaurantId, items, totalPrice });
    await order.save();

    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { orderId, status } = req.body;

    const order = await findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const restaurant = await mongoose.model('Restaurant').findById(order.restaurantId);
    if (restaurant.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this order' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCustomerOrders(req, res) {
  try {
    const customerId = req.user.id;
    const orders = await find({ customerId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}