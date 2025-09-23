const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const contactRoutes = require(path.join(__dirname, 'routes', 'contacts'));

// Swagger setup
const { swaggerUi, specs } = require(path.join(__dirname, 'swagger'));

// Debug: Show MongoDB URI being used
console.log('Connecting to MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Mount routes
app.use('/contacts', contactRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
