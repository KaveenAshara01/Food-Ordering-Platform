const Restaurant = require('../models/restaurant');
const MenuItem = require('../models/menuItem');

exports.createRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const ownerId = req.user.id; // From authMiddleware

    if (req.user.role !== 'restaurant-admin') {
      return res.status(403).json({ error: 'Only restaurant admins can create restaurants' });
    }

    const restaurant = new Restaurant({ name, address, ownerId });
    await restaurant.save();

    res.status(201).json({ message: 'Restaurant created', restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { restaurantId, name, description, price, category } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    if (restaurant.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to add menu items to this restaurant' });
    }

    const menuItem = new MenuItem({ restaurantId, name, description, price, category });
    await menuItem.save();

    res.status(201).json({ message: 'Menu item added', menuItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await MenuItem.find({ restaurantId });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};