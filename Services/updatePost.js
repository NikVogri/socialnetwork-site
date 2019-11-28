const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
  const random = RNG.generateOne(posts.length, 1);
  return await Post.findOne({
    where: {
      postID: random[0]
    }
  });
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
  return await Post.findAll({
    where: {
      postCategory: category.charAt(0).toUpperCase() + category.slice(1)
    }
  });
};

exports.getQueriedPosts = async query => {
  return await Post.findAll({
    where: {
      postQuery: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('postQuery')),
        'LIKE',
        `%${query}%`
      )
    }
  });
};
