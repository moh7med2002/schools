const Teacher = require('../models/Teacher');
const Course = require('../models/Course')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');



module.exports.register = async(req,res,next)=>
{
    try{
        const {name , email , password , yearsOfExperience , gender} = req.body;
        const teacher = await Teacher.findOne({where:{email:email}});
        if (teacher){
            const error = new Error ('الايميل مستخدم');
            error.statusCode = 403;
            throw error;
        }
        const hashPass = await bcrypt.hash(password,12);
        const newTeacher = await Teacher.create({
            email:email,
            password:hashPass,
            name:name,
            yearsOfExperience:+yearsOfExperience,
            gender:gender
        });
        await newTeacher.save()
        res.status(200).json({message:'تم انشاء حساب المعلم'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


exports.login = async(req,res,next)=>{
    const {email,password : pass} = req.body;
    try{
        const currentTeacher = await Teacher.findOne({where:{email:email}});
        if(!currentTeacher){
            const error = new Error('الايميل غير موجود');
            error.statusCode = 422;
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(pass,currentTeacher.password);
        if(!isPasswordMatch){
            const error = new Error('كلمة السر غير صحيحة');
            error.statusCode=422;
            throw error;
        };
        const {password,...other} = {...currentTeacher.toJSON()}
        const token = jwt.sign({
            teacherId:currentTeacher.id,
        },
        "token"
        );
        res.status(200).json({teacher:other, token:token});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllTeacher = async (req,res,next) => {
    try{
        const teachers = await Teacher.findAll();
        res.status(200).json({teachers:teachers.reverse()});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getTeacherById = async (req,res,next) => {
    const {teacherId}  = req.params;
    try{
        const teacher = await Teacher.findOne({where:{id:teacherId}});
        res.status(200).json({teacher});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getMyCourses = async (req,res,next) =>{
    const teacherId = req.teacherId;
    try{
        const courses = await Course.findAll({where:{teacherId:teacherId}, include:{all:true}});
        res.status(200).json({courses});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateTeacherImage = async (req,res,next) => {
    const teacherId = req.teacherId;
    try{
        const imageName = req.file.filename;
        const teacher = await Teacher.findOne({where:{id:teacherId}});
        if(teacher.image){
            clearImage(teacher.image);
        }
        teacher.image = imageName;
        const savedTeacher = await teacher.save();
        res.status(201).json({teacher:savedTeacher});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.updateTeacherInformation = async (req,res,next)=>{
    const {name  , yearsOfExperience , about} = req.body;
    const teacherId = req.teacherId;
    try{
        const teacher = await Teacher.findOne({where:{id:teacherId}});
        teacher.name = name;
        if(about){
            teacher.about = about;
        }else{
            teacher.about = null
        }
        teacher.yearsOfExperience = yearsOfExperience;
        const savedTeacher = await teacher.save();
        res.status(201).json({teacher:savedTeacher});
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