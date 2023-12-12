const express = require('express');
const userControllers = require('../Controllers/user.controllers');
const router = express.Router();

router.get('/teacher', userControllers.getTeacher);
router.get('/student', userControllers.getStudent);
router.get('/:id', userControllers.getUser);
router.post('/', userControllers.createUser);
router.patch('/:id', userControllers.updateUser);
router.delete('/', userControllers.deleteUser);

module.exports = router