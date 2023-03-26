const Student = require('../models/Student');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');




module.exports.registerStudent = async(req,res,next)=>
{
    try{
        const {name , email , password , gender} = req.body;
        const student = await Student.findOne({where:{email:email}});
        if (student){
            const error = new Error ('الايميل مستخدم');
            error.statusCode = 403;
            throw error;
        }
        const hashPass = await bcrypt.hash(password,12);
        const newStudent = await Student.create({
            email:email,
            password:hashPass,
            name:name,
            gender:gender
        });
        await newStudent.save()
        res.status(200).json({message:'تم انشاء حساب الطالب'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


exports.loginStudent = async(req,res,next)=>{
    const {email,password : pass} = req.body;
    try{
        const currentStudent = await Student.findOne({where:{email:email}});
        if(!currentStudent){
            const error = new Error('الايميل غير موجود');
            error.statusCode = 422;
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(pass,currentStudent.password);
        if(!isPasswordMatch){
            const error = new Error('كلمة السر غير صحيحة');
            error.statusCode=422;
            throw error;
        };
        const {password,...other} = {...currentStudent.toJSON()}
        const token = jwt.sign({
            studentId:currentStudent.id,
        },
        "token"
        );
        res.status(200).json({student:other, token:token});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getStudentCourses = async (req,res,next) => {
    const studentId = req.studentId;
    try{
        const student = await Student.findOne({
            where:{id:studentId} , 
            include:[
                { model : Course,
                include:{
                    all : true
                    }
                }
            ]
        });
        res.status(200).json({courses :  student.courses});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllStudents = async (req,res,next) =>{
    try{
        const students = await Student.findAll();
        res.status(200).json({students :  students.reverse()});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getStudentById = async (req,res,next) => {
    const studentId = req.studentId;
    try{
        const student = await Student.findOne({where:{id:studentId}});
        res.status(200).json({student});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateStudentImage = async (req,res,next) => {
    const studentId = req.studentId;
    try{
        const imageName = req.file.filename;
        const student = await Student.findOne({where:{id:studentId}});
        if(student.image){
            clearImage(student.image);
        }
        student.image = imageName;
        const savedStudent = await student.save();
        res.status(201).json({student:savedStudent});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.updateStudentInformation = async (req,res,next)=>{
    const {name } = req.body;
    const studentId = req.studentId;
    try{
        const student = await Student.findOne({where:{id:studentId}});
        student.name = name;
        const savedStudent = await student.save();
        res.status(201).json({student:savedStudent});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


const clearImage=(filePath)=>{
    filePath=path.join(__dirname,'..',`images/${filePath}`);
    fs.unlink(filePath,(err)=>{
        console.log(err);
    })
}