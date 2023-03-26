const Lesson = require('../models/Lesson');
const fs = require('fs');
const path = require('path');

module.exports.createLesson = async (req,res,next) => {
    const {unitId , isFile , iSVideo , videoUrl , title} = req.body;
    console.log(isFile === "false");
    try{
        const newLesson = await Lesson.create({
            title : title,
            isFile:isFile,
            iSvideo:iSVideo,
            url : isFile !=="false" ? req.file.filename : videoUrl,
            unitId:unitId
        });
        await newLesson.save();
        res.status(201).json({message:"تم انشاء الدرس بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getSingleLesson = async (req,res,next) => {
    const {lessonId} = req.params;
    try{
        const lesson = await Lesson.findOne({where:{id:lessonId}});
        res.status(200).json({lesson});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.deleteLesson = async (req,res,next) => {
    const {lessonId} = req.params;
    try{
        const lesson = await Lesson.findOne({where:{id:lessonId}});
        if(lesson.isFile){
            clearImage(lesson.url);
        }
        await lesson.destroy();
        res.status(200).json({lesson});
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