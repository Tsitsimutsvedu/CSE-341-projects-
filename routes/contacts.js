const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { connectToServer } = require('../db/conn');

// GET all contacts
router.get('/', async (req, res) => {
  const db = await connectToServer();
  const contacts = await db.collection('contacts').find().toArray();
  res.json(contacts);
});

// GET contact by id
router.get('/:id', async (req, res) => {
  const db = await connectToServer();
  try {
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// POST create a new contact
router.post('/', async (req, res) => {
  const db = await connectToServer();
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  
  // Week 02 requirement: All fields are required
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ 
      error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' 
    });
  }
  
  try {
    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection('contacts').insertOne(newContact);
    
    // Week 02 requirement: Return the new contact id
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// PUT update a contact by id
router.put('/:id', async (req, res) => {
  const db = await connectToServer();
  try {
    const update = { $set: req.body };
    const result = await db.collection('contacts').updateOne({ _id: new ObjectId(req.params.id) }, update);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    // Week 02 requirement: Return HTTP status code for successful completion
    res.status(204).send(); // 204 No Content - successful update
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format or update data' });
  }
});

// DELETE a contact by id
router.delete('/:id', async (req, res) => {
  const db = await connectToServer();
  try {
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    // Week 02 requirement: Return HTTP status code for successful completion
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

module.exports = router;