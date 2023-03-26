const express = require('express');
const router = express.Router();
const adminAuth = require('../midelware/adminAuth');

//  admin function by admin controllers
const adminController = require('../controllers/admin');
router.post('/auth/register' , adminController.register);
router.post('/auth/login' , adminController.login);


// admin function by subject controllers
const subjectController = require('../controllers/subject');
router.post('/subject/create' , adminAuth , subjectController.createSubject);
router.get('/subjects/all' , subjectController.getAllSubjects);

//  admin function by course controllers
const courseController = require('../controllers/course');
router.post('/course/create' , adminAuth , courseController.createCourse);


module.exports = router;