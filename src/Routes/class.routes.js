const express = require('express');
const classControllers = require('../Controllers/class.controllers');
const router = express.Router();

router.get('/', classControllers.getClass);
router.post('/', classControllers.createClass);
router.patch('/', classControllers.updateClass);
router.delete('/', classControllers.deleteClass);

module.exports = router