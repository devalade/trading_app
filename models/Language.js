const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Language = require('../services/Language');

const attributes = {
    lang_name: { type: DataTypes.STRING, defaultValue: '' },
    is_active: { type: DataTypes.INTEGER, defaultValue: 0}
};

const freeTableName =  {
    freezeTableName: true
}

const LanguageModels = db.define('languages', attributes, freeTableName);


// UserModels.sync().then(() => {
//   console.log('table created');
// });

module.exports = LanguageModels;
