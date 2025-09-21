require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Contact = require('./models/contact');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  const data = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf-8'));
  await Contact.deleteMany({});
  await Contact.insertMany(data);
  console.log('Sample contacts imported successfully!');
  mongoose.disconnect();
})
.catch(err => {
  console.error('Error importing data:', err);
});
