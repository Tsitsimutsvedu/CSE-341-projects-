// data/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('../models/contact');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedContacts = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    favoriteColor: 'Blue',
    birthday: new Date('1990-05-15')
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    favoriteColor: 'Green',
    birthday: new Date('1985-10-30')
  }
];

Contact.insertMany(seedContacts)
  .then(() => {
    console.log('Contacts seeded');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
