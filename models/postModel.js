const Sequelize = require('sequelize');
const sequelize = require('../database');
const { Model } = Sequelize;

class Post extends Model {}

Post.init(
  {
    postID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    postTitle: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 150,
      unique: false
    },
    postOriginalPoster: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postCategory: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postIcon: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postComments: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    postImagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postQuery: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Post'
  }
);

module.exports = Post;
