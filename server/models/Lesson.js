const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Lesson = sequelize.define('lesson',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        required:true
    },
    url:{
        type:DataTypes.STRING,
        required:true
    },
    isFile:{
        type:DataTypes.BOOLEAN,
        required:true
    },
    iSvideo:{
        type:DataTypes.BOOLEAN,
        required:true
    }
})

module.exports = Lesson
