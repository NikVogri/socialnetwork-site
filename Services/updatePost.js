const Post = require('../models/postModel');
const RNG = require('rand-numb-gen');
exports.getPosts = async () => {
  return await Post.findAll({
    order: [['createdAt', 'DESC']]
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
  return Post.findByPk(id);
};

exports.getRandom = async () => {
  const posts = await Post.findAll();
  return await Post.findByPk(RNG.generateOne(posts.length, 1));
};
