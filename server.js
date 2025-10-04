require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 8083;
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, OPTIONS, DELETE'
  );
  next();
});

// CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

// Routes
app.use('/', require('./routes/index.js'));

// Passport GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET, 
  callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Auth routes
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined
    ? `Logged in as ${req.session.user.displayName}`
    : 'Logged out');
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

// DB initialization and server start
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});

// Global error handler
process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});
