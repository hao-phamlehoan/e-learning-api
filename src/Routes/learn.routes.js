const express = require('express');
const learnControllers = require('../Controllers/learn.controllers');
const router = express.Router();

// Learn
router.get('/', learnControllers.getLearn);
router.get('/student/:id', learnControllers.getLearnByStudent);
router.get('/class/:id', learnControllers.getLearnByClass);
router.post('/', learnControllers.createLearn);
router.patch('/', learnControllers.updateLearn);
router.delete('/', learnControllers.deleteLearn);

// Subject
router.get('/subject', learnControllers.getAllSubject);
router.get('/subject/student/:id', learnControllers.getSubjectByStudent);
router.get('/subject/:id', learnControllers.getSubject);
router.post('/subject', learnControllers.createSubject);
router.patch('/subject/:id', learnControllers.updateSubject);
router.delete('/subject/:id', learnControllers.deleteSubject);

module.exports = router