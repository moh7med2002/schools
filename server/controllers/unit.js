const Unit = require('../models/Unit');

module.exports.createUnit = async (req,res,next)=> {
    const {title , courseId} = req.body;
    try{
        const unit = await Unit.create({
            title : title,
            courseId : courseId
        });
        await unit.save();
        res.status(201).json({message:"تم إضافة الوحدة بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateUnit = async (req,res,next) => {
    const {unitId} = req.params;
    try{
        const unit = await Unit.findOne({where:{id:unitId}});
        unit.title = req.body.title;
        await unit.save();
        res.status(201).json({message:"تم تعديل الوحدة بنجاح"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}