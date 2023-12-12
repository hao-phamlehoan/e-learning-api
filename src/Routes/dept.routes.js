const express = require('express');
const deptControllers = require('../Controllers/dept.controllers');
const router = express.Router();

router.get('/', deptControllers.getAllDept);
router.post('/', deptControllers.createDept);
router.patch('/:id', deptControllers.updateDept);
router.delete('/:id', deptControllers.deleteDept);

module.exports = router