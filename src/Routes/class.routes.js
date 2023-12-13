const express = require('express');
const classControllers = require('../Controllers/class.controllers');
const router = express.Router();

// Notification
router.post('/notify', classControllers.createNotifi);
router.get('/notify/class/:id', classControllers.getNotifiByStudent);
router.get('/notify/teacher/:id', classControllers.getNotifiByTeacher);
router.get('/notify/:id', classControllers.getNotifi);
router.get('/notify', classControllers.getAllNotifi);

// Document
router.get('/docu/teacher/:id', classControllers.getDocumentByTeacher);
router.get('/docu/class/:id', classControllers.getDocumentByClass);
router.get('/docu/:id', classControllers.getDocument);
router.post('/docu', classControllers.createDocumnet);
router.patch('/docu', classControllers.updateDocumnet);

// Teach

router.patch('/score', classControllers.activeScore);
// Class
router.get('/', classControllers.getAllClass);

router.get('/active/:id', classControllers.getClassActive);
router.get('/teacher/:id', classControllers.getClassByTeacher);
router.get('/student/:id', classControllers.getClassStudent);
router.get('/:id', classControllers.getClass);
router.post('/', classControllers.createClass);
router.patch('/', classControllers.updateClass);
router.delete('/', classControllers.deleteClass);

module.exports = router