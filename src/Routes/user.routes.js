const express = require('express');
const userControllers = require('../Controllers/user.controllers');
const router = express.Router();

router.get('/', userControllers.getUser);
router.post('/', userControllers.createUser);
router.patch('/', userControllers.updateUser);
router.delete('/', userControllers.deleteUser);

module.exports = router