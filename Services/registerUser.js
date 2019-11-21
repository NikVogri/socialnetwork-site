const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/userModel');

exports.createNew = async (name, email, password, confirmPassword) => {
  // check if password and confirmpassword match
  if (password === confirmPassword) {
    try {
      await User.create({
        displayName: name,
        userEmail: email,
        userPassword: password
      });
      return;
    } catch (err) {
      return err;
    }
  }
  // check if email or name is already used
  // create new user
};
