const express = require('express');
const deptControllers = require('../Controllers/dept.controllers');
const router = express.Router();

router.get('/', deptControllers.getDept);
router.post('/', deptControllers.createDept);
router.patch('/', deptControllers.updateDept);
router.delete('/', deptControllers.deleteDept);

module.exports = router