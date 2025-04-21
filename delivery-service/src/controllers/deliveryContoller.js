const Delivery = require('../models/delivery');
const Order = require('../models/order');

exports.assignDelivery = async (req, res) => {
  try {
    const { orderId, deliveryPersonId } = req.body;

    if (req.user.role !== 'restaurant-admin') {
      return res.status(403).json({ error: 'Only restaurant admins can assign deliveries' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const restaurant = await mongoose.model('Restaurant').findById(order.restaurantId);
    if (restaurant.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to assign deliveries for this order' });
    }

    const delivery = new Delivery({ orderId, deliveryPersonId });
    await delivery.save();

    res.status(201).json({ message: 'Delivery assigned', delivery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId, status } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    if (delivery.deliveryPersonId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this delivery' });
    }

    delivery.status = status;
    await delivery.save();

    if (status === 'delivered') {
      const order = await Order.findById(delivery.orderId);
      order.status = 'delivered';
      await order.save();
    }

    res.status(200).json({ message: 'Delivery status updated', delivery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDeliveryAssignments = async (req, res) => {
  try {
    const deliveryPersonId = req.user.id;
    const deliveries = await Delivery.find({ deliveryPersonId });
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};