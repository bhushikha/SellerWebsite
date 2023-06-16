const Sequelize=require('sequelize');

const sequelize= new Sequelize('sakila', 'root', 'node',{
    dialect:'mysql',
    host:'localhost:3306' 
});

module.exports = sequelize;