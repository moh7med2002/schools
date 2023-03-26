const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Teacher = sequelize.define('teacher',{
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
    gender:{
        type:DataTypes.STRING,
        required:true
    },
    image:{
        type:DataTypes.STRING,
    },
    about:{
        type:DataTypes.TEXT,
    },
    yearsOfExperience:{
        type:DataTypes.INTEGER,
        required:true
    }
})

module.exports = Teacher