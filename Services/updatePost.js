const Sequelize = require('sequelize');
const Post = require('../models/postModel');
exports.getPosts = async () => {
  return await Post.findAll({
    order: Sequelize.literal('rand()')
  });
};

exports.getUserPosts = async id => {
  return Post.findAll({
    where: {
      postOriginalPoster: id
    }
  });
};

exports.getOnePost = async id => {
  return await Post.findByPk(id);
};

exports.getRandom = async () => {
  return await Post.findOne({ order: Sequelize.literal('rand()') });
};

exports.getTopPosts = async () => {
  return await Post.findAll({
    order: [['postLikes', 'DESC']]
  });
};

exports.getNewPosts = async () => {
  return await Post.findAll({
    order: [['createdAt', 'ASC']]
  });
};

exports.getCategoryPosts = async category => {
  console.log(category.charAt(0).toUpperCase() + category.slice(1));
  return await Post.findAll({
    where: {
      postCategory: category.charAt(0).toUpperCase() + category.slice(1)
    }
  });
};
