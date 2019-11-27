const express = require('express');
const viewController = require('../Controllers/viewController');
const userController = require('../Controllers/userController');
const postController = require('../Controllers/postController');
const { checkAuthentication } = require('../Utils/auth');
// Router
const router = express.Router();

router.get('/login', viewController.getLogin);
router.get('/', postController.getAllPosts, viewController.getIndex);
router.get('/register', viewController.getRegister);
router.get('/logout', userController.logoutUser);
router.get('/post/:id', postController.getOnePost, viewController.getPost);
router.get('/randomPost', postController.getRandomPost, viewController.getPost);
router.get('/:type', postController.getTypePosts, viewController.getIndex);
router.get(
  '/category/:category',
  postController.getCategory,
  viewController.getIndex
);
// POST
router.post('/register', userController.createNewUser);
router.post('/login', userController.loginUser);
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
