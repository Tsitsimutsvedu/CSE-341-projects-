const express = require('express');
const passport = require('passport');
const router = express.Router();

// Swagger documentation route
router.use('/', require('./swagger'));

// Contacts API route
router.use('/contacts', require('./contacts'));

// GitHub login route
router.get('/login', passport.authenticate('github'));

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;


