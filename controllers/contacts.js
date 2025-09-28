const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('Contacts').find();
    console.log(await mongodb.getDatabase().db());
    result.toArray().then((Contacts) => {
      
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Contacts);
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Contacts').find({ _id: userId });
    result.toArray().then((Contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Contacts[0]);
    });
};


const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        phone: req.body.phone   
      };
      const response = await mongodb.getDatabase().db().collection('Contacts').insertOne(user);
      if (response.acknowledged) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
      }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        phone: req.body.phone
    };
    const response = await mongodb.getDatabase().db().collection('Contacts').replaceOne({ _id: userId }, user);
      if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  };

  const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
  };


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};