const mysql = require('mysql2');
const {Sequelize} = require('sequelize');

 


// const dotenv = require('dotenv');

// dotenv.config();

module.exports =  new Sequelize('tradingsystem', 'root','' , {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// get the client