const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

// Get all contacts
router.get('/', contactsController.getAll);

// Get a single contact by ID
router.get('/:id', contactsController.getSingle);

// Create a new contact
router.post('/', validation.saveContact, contactsController.createContact);

// Update a contact by ID
router.put('/:id', validation.saveContact, contactsController.updateContact);

// Delete a contact by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
