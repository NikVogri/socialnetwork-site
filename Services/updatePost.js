const Sequelize = require('sequelize');
const Post = require('../models/postModel');
const RNG = require('rand-numb-gen');
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
  const posts = await Post.findAll();
  const genNumber = RNG.generateOne(posts.length, 1);
  return await Post.findByPk(genNumber[0]);
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
