const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const attributes = {
    edu_title: { type: DataTypes.STRING, defaultValue: '' },
    edu_desc: { type: DataTypes.STRING, defaultValue: '' },
    edu_url: { type: DataTypes.STRING, defaultValue: '' },
    is_active: { type: DataTypes.INTEGER, defaultValue: 1 }
};

const freeTableName =  {
    freezeTableName: true
}
const EducationModels = db.define('education', attributes, freeTableName);


// UserModels.sync().then(() => {
//   console.log('table created');
// });

module.exports = EducationModels;
