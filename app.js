const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const viewRouter = require('./Routes/viewRouter');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
//VARIABLES
const app = express();
const port = process.env.PORT || 3000;

// Get data from config.env
dotenv.config({
  path: './config.env'
});

// Limit user requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // api request limit
  statusCode: 429,
  message: {
    status: 'error',
    message: 'Limit reached please wait a couple of minutes before trying again'
  }
});

//MIDDLEWARE
app.use(express.json({ limit: '10kb' }));
app.use(limiter);
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(passport.initialize());
app.use(passport.session()); */
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'front')));

//ROUTES
app.use('/', viewRouter);

// START SERVER
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
