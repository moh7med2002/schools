const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



module.exports.register = async(req,res,next)=>
{
    try{
        const {email , password} = req.body;
        const admin = await Admin.findOne({where:{email:email}});
        if (admin){
            const error = new Error ('الايميل مستخدم');
            error.statusCode = 403;
            throw error;
        }
        const hashPass = await bcrypt.hash(password,12);
        const newAdmin = await Admin.create({
            email:email,
            password:hashPass,
        });
        await newAdmin.save()
        res.status(200).json({message:'تم انشاء حساب الادمن'});
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
        const currentAdmin = await Admin.findOne({where:{email:email}});
        if(!currentAdmin){
            const error = new Error('الايميل غير موجود');
            error.statusCode = 422;
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(pass,currentAdmin.password);
        if(!isPasswordMatch){
            const error = new Error('كلمة السر غير صحيحة');
            error.statusCode=422;
            throw error;
        };
        const {password,...other} = {...currentAdmin.toJSON()}
        const token = jwt.sign({
            adminId:currentAdmin.id,
        },
        "token"
        );
        res.status(200).json({admin:other, token:token});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}