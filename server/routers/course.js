const express = require('express');
const router = express.Router();
const courseControler = require('../controllers/course');

router.get('/all' , courseControler.getAllCourses);
router.get('/:courseId' , courseControler.getSingleCourse);


module.exports = router;