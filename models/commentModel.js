const Sequelize = require('sequelize');
const sequelize = require('../database');
const { Model } = Sequelize;

class Comment extends Model {}

Comment.init(
  {
    commentID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    postID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    originalPosterID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    commentLike: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    commentDislike: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    commentBody: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Comment'
  }
);

module.exports = Comment;
