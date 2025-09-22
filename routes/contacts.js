const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET all
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact ? res.json(contact) : res.status(404).send('Contact not found');
});

// POST
router.post('/', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json({ id: contact._id });
});

// PUT
router.put('/:id', async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  result ? res.status(200).send('Contact updated') : res.status(404).send('Contact not found');
});

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.id);
  result ? res.status(200).send('Contact deleted') : res.status(404).send('Contact not found');
});

module.exports = router;

