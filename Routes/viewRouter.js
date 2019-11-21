const express = require('express');
const viewController = require('../Controllers/viewController');
const userController = require('../Controllers/userController');

// Router
const router = express.Router();

router.post('/register', userController.createNewUser);
router.get('/', viewController.getIndex);

module.exports = router;
