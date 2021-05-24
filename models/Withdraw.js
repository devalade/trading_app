// const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const UserModels = require('../models/User');

const attributes = {
    userId: {type: DataTypes.INTEGER},
    withdraw_type: { type: DataTypes.STRING, defaultValue: '' },
    withdraw_status: { type: DataTypes.STRING, defaultValue: '' },
    mobile: { type: DataTypes.STRING, defaultValue: '' },
    account_no: { type: DataTypes.STRING, defaultValue: '' },
    ifsc_code: { type: DataTypes.STRING, defaultValue: '' },
    account_holder_name: { type: DataTypes.STRING, defaultValue: '' },
    amount: { type: DataTypes.INTEGER, defaultValue: '' }
}

const freeTableName =  {
    freezeTableName: true
}

const WithdrawModels = db.define('withdraw', attributes, freeTableName);

// WithdrawModels.belongsTo(UserModels, {
//     foreignKey: 'user_id'
// });

module.exports = WithdrawModels;