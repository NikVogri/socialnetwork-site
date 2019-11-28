// Set node enviroment
const env = 'development';
if (env !== 'production') {
  require('dotenv').config();
}
// Imports
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const viewRouter = require('./Routes/viewRouter');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const initializePassport = require('./Services/passport-config');

//VARIABLES
const app = express();
//  passport config
require('./Services/passport-config')(passport);

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

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// initialize passport
initializePassport(passport);

//MIDDLEWARE
app.use(express.json({ limit: '10kb' }));
app.use(limiter);
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// passport
app.use(passport.initialize());
app.use(passport.session());

// flash mesagges
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
//VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'front')));

//ROUTES
app.use('/', viewRouter);

// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
