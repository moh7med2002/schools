const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Unit = sequelize.define('unit',{
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
})

module.exports = Unit
