const commentCreator = require('../Services/createComment');
const commentUpdater = require('../Services/updateComment');

exports.createComment = async (req, res, next) => {
  const { commentBody } = req.body;
  const postID = req.params.post;
  const userID = req.params.user;
  await commentCreator.createNewComment(commentBody, postID, userID);
  res.status(200).redirect('back');
};

exports.getAllComments = async (req, res, next) => {
  if (req.params.id) {
    req.comments = await commentUpdater.getPostComments(req.params.id);
  } else if (req.postID) {
    req.comments = await commentUpdater.getPostComments(req.postID);
    console.log(req.postID);
  }
  next();
};
