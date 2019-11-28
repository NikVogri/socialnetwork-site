const express = require('express');
const viewController = require('../Controllers/viewController');
const userController = require('../Controllers/userController');
const postController = require('../Controllers/postController');
const commentController = require('../Controllers/commentController');
const { checkAuthentication } = require('../Utils/auth');
// Router
const router = express.Router();
// Basic route renders.
router.get('/login', viewController.getLogin);
router.get('/', postController.getAllPosts, viewController.getIndex);
router.get('/register', viewController.getRegister);
router.get('/logout', userController.logoutUser);
router.get(
  '/post/:id',
  postController.getOnePost,
  commentController.getAllComments,
  viewController.getPost
);
router.get(
  '/randomPost',
  postController.getRandomPost,
  commentController.getAllComments,
  viewController.getPost
);
router.get('/type/:type', postController.getTypePosts, viewController.getIndex);
router.get(
  '/category/:category',
  postController.getCategory,
  viewController.getIndex
);

// POST
router.post('/register', userController.createNewUser);
router.post('/login', userController.loginUser);
router.post(
  '/search/posts',
  postController.searchQueryPost,
  viewController.getIndex
);
// Comment Routes
router.post('/createComment/:post/:user', commentController.createComment);
//////////////////////////////////////////////////////////////////////
// PROTECTED ROUTES
/* router.use(checkAuthentication); */

// Render Views
router.get(
  '/user/:id',
  userController.getUserInfo,
  postController.getUserPost,
  viewController.getUser
);
router.get('/user/settings/:type', viewController.getSettings);
// Get from forms - User Forms
router.post('/updateAccount', userController.updateAccount);
router.post('/updatePassword', userController.updatePassword);
router.post('/updateProfile', userController.updateProfile);
router.post('/deleteUser', userController.deleteUser);
router.post(
  '/updateImage',
  userController.uploadUserPhoto,
  userController.updateImage,
  userController.resizeUserPhoto
);
// Get from forms - Post Forms
router.post(
  '/createPost',
  postController.uploadPostImage,
  postController.resizePostImage,
  postController.createNewPost
);
module.exports = router;
