require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');
const Order = require('./models/order');
const User = require('./models/user');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const products = [
  { name: "Product 1", description: "Description 1", price: 10, stock: 100, image: "image1.jpg", category: "Category 1", status: "available" },
  { name: "Product 2", description: "Description 2", price: 20, stock: 200, image: "image2.jpg", category: "Category 2", status: "available" },
  { name: "sofa", description: "dshsdghfghfg 2", price: 20, stock: 200, image: "https://i.pinimg.com/564x/36/35/4e/36354ec8f89cd036d22ea37b93c9a1f3.jpg", category: "Category 2", status: "addaa" },

];


const users = [
  { name: "User 1", email: "user1@example.com", phone: "1234567890", address: "Address 1" },
  { name: "User 2", email: "user2@example.com", phone: "0987654321", address: "Address 2" }
];

const orders = [
  { orderNumber: "1001", customerName: "User 1", customerEmail: "user1@example.com", customerPhone: "1234567890", customerAddress: "Address 1", orderStatus: "pending", orderDate: new Date(), orderItems: [{ productName: "Product 1", productPrice: 10, productQuantity: 2, productSubtotal: 20 }], orderTotal: 20 },
  { orderNumber: "1002", customerName: "User 2", customerEmail: "user2@example.com", customerPhone: "0987654321", customerAddress: "Address 2", orderStatus: "shipped", orderDate: new Date(), orderItems: [{ productName: "Product 2", productPrice: 20, productQuantity: 1, productSubtotal: 20 }], orderTotal: 20 }
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Order.deleteMany({});
  await User.deleteMany({});
  await Product.insertMany(products);
  await Order.insertMany(orders);
  await User.insertMany(users);
  console.log("Database seeded!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
