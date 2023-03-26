const express = require('express')
const app = express()
const parser = require('body-parser')
const multer = require('multer')
const path = require('path')

app.use(parser.json())
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})

app.use(multer({storage:fileStorage}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    if(req.method==="OPTIONS")
    {
        return res.sendStatus(200)
    }
    next();
})


const student = require('./models/Student')
const teacher = require('./models/Teacher')
const admin = require('./models/Admin')
const answer = require('./models/Answer')
const course = require('./models/Course')
const exam = require('./models/Exam')
const grade = require('./models/Grade')
const lesson = require('./models/Lesson')
const question = require('./models/Question')
const subject = require('./models/Subject')
const unit = require('./models/Unit')

/** student relationships */
student.belongsToMany(course,{through:"stdeuntCourses"})

/** subject relationships */
subject.hasMany(course)

/** course relationships */
course.belongsToMany(student,{through:"stdeuntCourses"})
course.belongsTo(subject)
course.hasMany(unit)
course.hasOne(exam)
course.belongsTo(teacher)

/** unit relationships*/
unit.belongsTo(course)
unit.hasMany(lesson)

/** lesson relationships */
lesson.belongsTo(unit)

/** exam relationships */
exam.belongsTo(course)
exam.hasMany(question)
exam.hasMany(grade)

/** question relationships */
question.belongsTo(exam)
question.hasMany(answer)

/** answer relationships */
answer.belongsTo(question)

/** grade relationships*/
grade.belongsTo(exam)

/** teacher relationships*/
teacher.hasMany(course)


const studentRouter = require('./routers/student');
app.use('/api/student' , studentRouter);

const adminRouter = require('./routers/admin');
app.use('/api/admin' , adminRouter);

const teacherRouter = require('./routers/teacher');
app.use('/api/teacher' , teacherRouter);

const subjectRouter = require('./routers/subject');
app.use('/api/subject' , subjectRouter);

const courseRouter = require('./routers/course');
app.use('/api/course' , courseRouter);

const lessonRouter = require('./routers/lesson');
app.use('/api/lesson' , lessonRouter);

app.get('/api/auth/data' , async(req,res,next)=>{
    const teachersNumber = await Teacher.count();
    const studentsNumber = await Student.count();
    const coursesNumber = await Course.count();
    const subjectsNumber = await Subject.count();
    res.status(200).json({teachersNumber , studentsNumber , coursesNumber , subjectsNumber});
})

app.use((error,req,res,next)=> 
{
    console.log(error);
    const status = error.statusCode
    const message = error.message
    res.status(status).json({message:message})
})

const sequlize = require('./utils/database')
const Teacher = require('./models/Teacher')
const Student = require('./models/Student')
const Course = require('./models/Course')
const Subject = require('./models/Subject')
sequlize.sync({})
.then(result=>
    {
        console.log('connection')
        app.listen(8000)
    })