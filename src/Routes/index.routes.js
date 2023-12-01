const express = require('express');
const classRoutes = require('./class.routes');
const userRoutes = require('./user.routes');
const learnRoutes = require('./learn.routes');
const deptRoutes = require('./dept.routes');
const router = express.Router();

router.use('/class', classRoutes);
router.use('/dept', deptRoutes);
router.use('/user', userRoutes);
router.use('/learn', learnRoutes);

module.exports = router