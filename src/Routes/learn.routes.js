const express = require('express');
const learnControllers = require('../Controllers/learn.controllers');
const router = express.Router();

router.get('/', learnControllers.getLearn);
router.post('/', learnControllers.createLearn);
router.patch('/', learnControllers.updateLearn);
router.delete('/', learnControllers.deleteLearn);

router.get('/subject', learnControllers.getAllSubject);
router.get('/subject/:id', learnControllers.getSubject);
router.post('/subject', learnControllers.createSubject);
router.patch('/subject', learnControllers.updateSubject);
router.delete('/subject', learnControllers.deleteSubject);

module.exports = router