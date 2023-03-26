const Subject = require('../models/Subject');

module.exports.createSubject = async (req,res,next) => {
    const {title} = req.body;
    try{
        const subject = await Subject.findOne({where:{title:title}});
        if (subject){
            const error = new Error ('اسم المادة موجود');
            error.statusCode = 403;
            throw error;
        }
        const newSubject = await Subject.create({
            title:title,
        });
        await newSubject.save()
        res.status(201).json({message:'تم انشاء المادة'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllSubjects = async (req,res,next) => {
    try{
        const subjects = await Subject.findAll({include:{all:true}});
        res.status(200).json({ subjects : subjects.reverse()});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}