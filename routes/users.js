const userController = require('../controllers/userController')
var express = require('express');
var router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;
