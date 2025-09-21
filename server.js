require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/contacts', contactsRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
