const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        // check if user exists
        await User.findOne({ where: { userEmail: email } })
          .then(user => {
            if (!user) {
              console.log('email not found');
              return done(null, false, {
                message: 'That email is not registered'
              });
            }
            bcrypt.compare(password, user.userPassword, (err, res) => {
              if (err) throw err;
              if (res) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Password incorrect' });
              }
            });
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.userID);
  });

  passport.deserializeUser(async (id, done) => {
    await User.findOne({ where: { userID: id } })
      .then(user => done(null, user))
      .catch(err => done(err, false));
  });
};
