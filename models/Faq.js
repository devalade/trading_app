const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const attributes = {
    faq_question: { type: DataTypes.STRING, defaultValue: '' },
    faq_anwer: { type: DataTypes.STRING, defaultValue: '' },
    is_active: { type: DataTypes.INTEGER, defaultValue: 1 }
};

const freeTableName =  {
    freezeTableName: true
}

const FaqModels = db.define('faq', attributes, freeTableName);


// UserModels.sync().then(() => {
//   console.log('table created');
// });

module.exports = FaqModels;
