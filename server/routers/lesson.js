const express = require('express');
const router = express.Router();

const lessonControllers = require('../controllers/lesson');

router.get('/:lessonId' , lessonControllers.getSingleLesson);

module.exports = router;