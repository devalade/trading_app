const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Help = require('../services/Help');

const attributes = {
    help_language: { type: DataTypes.STRING, defaultValue: '' },
    help_country_flag: { type: DataTypes.STRING, defaultValue: '' },
    help_description: { type: DataTypes.STRING, defaultValue: '' },
    help_phone: { type: DataTypes.STRING, defaultValue: '' },
    help_email: { type: DataTypes.STRING, defaultValue: '' },
    is_active: { type: DataTypes.INTEGER, defaultValue: 1 }
};

const freeTableName =  {
    freezeTableName: true
}

const HelpModels = db.define('help', attributes, freeTableName);


// UserModels.sync().then(() => {
//   console.log('table created');
// });

module.exports = HelpModels;
