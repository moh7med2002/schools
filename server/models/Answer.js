const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Answer = sequelize.define('answer',{
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
    isRight:{
        type:DataTypes.BOOLEAN,
        required:true
    }
})

module.exports = Answer
