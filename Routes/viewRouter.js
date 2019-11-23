const express = require('express');
const viewController = require('../Controllers/viewController');
const userController = require('../Controllers/userController');
const { checkAuthentication } = require('../Utils/auth');
// Router
const router = express.Router();

router.get('/login', viewController.getLogin);
router.get('/', viewController.getIndex);
router.get('/register', viewController.getRegister);

// POST
router.post('/register', userController.createNewUser);
router.post('/login', userController.loginUser);
// Protected routes
module.exports = router;
