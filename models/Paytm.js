// const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const attributes = {
    transaction_id: { type: DataTypes.STRING, defaultValue: '' },
    amount: { type: DataTypes.STRING, defaultValue: '' },
    is_used: { type: DataTypes.TINYINT, defaultValue: '' }
}

const freeTableName =  {
    freezeTableName: true
}

const PaytmModels = db.define('paytm_transaction', attributes, freeTableName);

module.exports = PaytmModels;