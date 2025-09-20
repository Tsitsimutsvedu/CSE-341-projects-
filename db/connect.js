const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGODB_URI;

let client;
let db;

async function connectToServer() {
  if (db) return db;
  client = new MongoClient(connectionString, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(); // uses database from connection string
  return db;
}

module.exports = { connectToServer };