const postCreator = require('../Services/createPost');

exports.createNewPost = async (req, res, next) => {
  const { postName, postImage, postCategory } = req.body;
  console.log(req.body);
  console.log(postName);
  next();
};
