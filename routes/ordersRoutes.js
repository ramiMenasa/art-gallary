const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Create a new order
router.post('/orders', async (req, res) => {
  const { orderNumber, customerName, customerEmail, customerPhone, customerAddress, orderStatus, orderItems, orderTotal } = req.body;
  try {
    const newOrder = new Order({ orderNumber, customerName, customerEmail, customerPhone, customerAddress, orderStatus, orderItems, orderTotal });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an order
router.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { orderNumber, customerName, customerEmail, customerPhone, customerAddress, orderStatus, orderItems, orderTotal } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderNumber, customerName, customerEmail, customerPhone, customerAddress, orderStatus, orderItems, orderTotal },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order
router.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
