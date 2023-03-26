const Sequelize = require('sequelize')

const DEV_DATABASE_URL='postgres://school_shatha:123456@localhost:5432/school_db'



// local db
const sequelize = new Sequelize('school_cv','root','059283805928388',{dialect:'mysql',host:"localhost"});


module.exports = sequelize;
