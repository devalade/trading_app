const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Deposit = require('../services/Deposit');

const attributes = {
    amount_inr: { type: DataTypes.STRING, defaultValue: '' },
    amount_dollar: { type: DataTypes.STRING, defaultValue: '' }, deposit_bonus_percentage: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active: {type: DataTypes.INTEGER, defaultValue: 1}
};
const freeTableName =  {
    freezeTableName: true
}

const DepositModels = db.define('deposit', attributes, freeTableName);


module.exports = DepositModels;
