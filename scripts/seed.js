const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const contacts = [
  {
    firstName: 'Atwell',
    lastName: 'Dawi',
    email: 'atwell@example.com',
    favoriteColor: 'Blue',
    birthday: '1976-01-01'
  },
  {
    firstName: 'Binah',
    lastName: 'Wite',
    email: 'bina@example.com',
    favoriteColor: 'Red',
    birthday: '1999-01-01'
  },
  {
    firstName: 'Tee',
    lastName: 'Nat',
    email: 'tee@example.com',
    favoriteColor: 'Green',
    birthday: '2010-01-01'
  }
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const col = db.collection('contacts');
    // Optional: clear existing sample docs that match these emails
    await col.deleteMany({ email: { $in: contacts.map(c => c.email) } });
    const result = await col.insertMany(contacts);
    console.log('Inserted', result.insertedCount, 'contacts');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();