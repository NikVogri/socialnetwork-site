const Sequelize = require('sequelize');
const sequelize = require('../database');
const { Model } = Sequelize;

class User extends Model {}

User.init(
  {
    userID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    displayName: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 30,
      unique: true
    },
    userEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    userPassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userGender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    userBio: {
      type: Sequelize.STRING,
      allowNull: true
    },
    userBirthday: {
      type: Sequelize.STRING,
      allowNull: true
    },
    imagePath: {
      type: Sequelize.STRING,
      defaultValue: './front/img/User_default',
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

module.exports = User;
