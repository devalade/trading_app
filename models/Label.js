const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Label = require('../services/Label');

const attributes = {
    lang_label: { type: DataTypes.STRING, defaultValue: '' },
    lang_english: { type: DataTypes.STRING, defaultValue: '' },
    lang_gujarati: { type: DataTypes.STRING, defaultValue: '' },
};

const freeTableName =  {
    freezeTableName: true
}

const LabelModels = db.define('language_label', attributes, freeTableName);


// UserModels.sync().then(() => {
//   console.log('table created');
// });

module.exports = LabelModels;
