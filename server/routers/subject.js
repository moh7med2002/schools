const express = require('express');
const router = express.Router();
const subjectControler = require('../controllers/subject');

router.get('/all' , subjectControler.getAllSubjects);



module.exports = router;