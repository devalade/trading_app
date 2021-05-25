const mysql = require('mysql2');
const {Sequelize} = require('sequelize');

 


// const dotenv = require('dotenv');

// dotenv.config();
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB = process.env.DB || 'tradingsystem';


module.exports =  new Sequelize(DB, DB_USER,DB_PASSWORD , {
  host: DB_HOST,
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