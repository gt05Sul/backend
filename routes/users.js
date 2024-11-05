const userController = require('../controllers/userController')
var express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
var router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserWithAddress);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
