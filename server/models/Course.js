const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Course = sequelize.define('course',{
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
    image:{
        type:DataTypes.STRING,
        required:true
    },
    price:{
        type : DataTypes.INTEGER,
        required: true
    }
})

module.exports = Course
