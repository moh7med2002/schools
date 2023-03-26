const express = require('express');
const router = express.Router();
const studentControler = require('../controllers/student');

router.post('/auth/register' , studentControler.registerStudent);
router.post('/auth/login' , studentControler.loginStudent);
router.get('/all' , studentControler.getAllStudents);


const studentAuth = require('../midelware/studentAuth');

router.put('/update/image' , studentAuth , studentControler.updateStudentImage);
router.put('/update/information' , studentAuth , studentControler.updateStudentInformation);

router.get('/my_courses' , studentAuth , studentControler.getStudentCourses);
// course function for student
const courseController = require('../controllers/course');
router.post('/course/register' , studentAuth , courseController.joinCourse);

module.exports = router;