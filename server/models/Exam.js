const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Exam = sequelize.define('exam',{
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
    totalMark:{
        type:DataTypes.INTEGER,
        required:true
    },
    duration:{
        type:DataTypes.INTEGER,
        required:true
    }
})

module.exports = Exam
