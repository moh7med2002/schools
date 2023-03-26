const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Student = sequelize.define('student',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        required:true
    },
    password:{
        type:DataTypes.STRING,
        required:true
    },
    name:{
        type:DataTypes.STRING,
        required:true
    },
    image:{
        type:DataTypes.STRING,
    },
    gender:{
        type:DataTypes.STRING,
        required:true
    }
})

module.exports = Student
