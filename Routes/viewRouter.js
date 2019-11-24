const express = require('express');
const viewController = require('../Controllers/viewController');
const userController = require('../Controllers/userController');
const { checkAuthentication } = require('../Utils/auth');
// Router
const router = express.Router();

router.get('/login', viewController.getLogin);
router.get('/', viewController.getIndex);
router.get('/register', viewController.getRegister);
router.get('/logout', userController.logoutUser);
// POST
router.post('/register', userController.createNewUser);
router.post('/login', userController.loginUser);
// Protected routes
/* router.use(checkAuthentication); */
router.get('/user/:id', viewController.getUser);
router.get('/user/settings/:type', viewController.getSettings);
router.post('/updateAccount', userController.updateAccount);
router.post('/updatePassword', userController.updatePassword);
router.post('/updateProfile', userController.updateProfile);
router.post('/deleteUser', userController.deleteUser);
module.exports = router;
