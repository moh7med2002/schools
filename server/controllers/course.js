const Course = require('../models/Course');
const Subject = require('../models/Subject');
const Unit = require('../models/Unit');
const Lesson = require('../models/Lesson');
const Student = require('../models/Student');

module.exports.createCourse = async (req,res,next) => {
    const {title , subjectId , teacherId , price} = req.body;
    try{
        if(!req.file){
            const error = new Error('الرجاء تحميل صورة الدورة')
        }
        const imageName = req.file.filename;
        const newCourse = await Course.create({
            title:title,
            subjectId:subjectId,
            teacherId:teacherId,
            image:imageName,
            price : +price
        });
        await newCourse.save()
        res.status(201).json({message:'تم انشاء الدورة'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllCourses = async (req,res,next) => {
    try{
        const courses = await Course.findAll({include:{all:true}});
        res.status(200).json({ courses : courses.reverse()});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getSingleCourse = async (req,res,next) => {
    const {courseId} = req.params;
    try{
        const course = await Course.findOne({where:{id:courseId} ,
            include:[
                {model:Subject},
                {model : Unit ,
                include:{
                    model : Lesson
                }
                },
                {model : Student}
            ]
        });
        res.status(200).json({course});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

// join or register course by student
module.exports.joinCourse = async (req,res,next) => {
    const studentId = req.studentId;
    const {courseId} = req.body;
    console.log({studentId,courseId});
    try{
        const student = await Student.findOne({where:{id:studentId}});
        const course = await Course.findOne({where:{id:courseId}});
        if(await student.hasCourse(course)){
            return res.status(402).json({message:"انت مشترك في الكورس مسبقا"})
        }
        await student.addCourse(course);
        res.status(201).json({message:"تم اللإشتراك في الكورس بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}