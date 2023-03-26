const express = require('express');
const router = express.Router();
const teacherControler = require('../controllers/teacher');

const teacherAuth = require('../midelware/teacherAuth')

router.post('/auth/register' , teacherControler.register);
router.post('/auth/login' , teacherControler.login);
router.get('/all' , teacherControler.getAllTeacher);


router.get('/my_courses' , teacherAuth , teacherControler.getMyCourses);
router.get('/:teacherId' , teacherControler.getTeacherById);


router.put('/update/image' , teacherAuth , teacherControler.updateTeacherImage);
router.put('/update/information' , teacherAuth , teacherControler.updateTeacherInformation);

// unit function
const unitController = require('../controllers/unit');
router.post('/unit/create' , teacherAuth , unitController.createUnit);
router.put('/unit/update/:unitId' , teacherAuth , unitController.updateUnit);


// lesson function
const lessonController = require('../controllers/lesson');
router.post('/lesson/create' , teacherAuth , lessonController.createLesson);
router.delete('/lesson/:lessonId' , teacherAuth , lessonController.deleteLesson);



module.exports = router;