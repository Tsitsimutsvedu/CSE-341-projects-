// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const contactsRoutes = require('./routes/contacts');
const setupSwagger = require('./swagger');

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Set up routes
app.use('/contacts', contactsRoutes);

// Set up Swagger documentation
setupSwagger(app);

// Define port with fallback
const PORT = process.env.PORT || 3006;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
