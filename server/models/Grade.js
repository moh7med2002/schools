const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Grade = sequelize.define('grade',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    studentMark:{
        type:DataTypes.INTEGER,
        required:true
    },
    totalMark:{
        type:DataTypes.INTEGER,
        required:true
    }
})

module.exports = Grade
