const Contact = require('../models/contact');

exports.getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

exports.getById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  contact ? res.status(200).json(contact) : res.status(404).json({ message: 'Contact not found' });
};

exports.create = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json({ id: contact._id });
};

exports.update = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.sendStatus(204);
};

exports.remove = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
