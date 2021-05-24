// const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const User = require('../services/User');
const AssetsModels = require('./Assets');

const attributes = {
    assetId: { type: DataTypes.INTEGER, defaultValue: 1 },
    investment_amount: { type: DataTypes.STRING, defaultValue: '' },
    bid_price: { type: DataTypes.STRING, defaultValue: '' },
    close_price: { type: DataTypes.STRING, defaultValue: '' },
    trade_type: { type: DataTypes.STRING, defaultValue: 2 },
    userId: { type: DataTypes.INTEGER, defaultValue: 182 },
    total_earning: { type: DataTypes.STRING, defaultValue: '' },
    trade_status: { type: DataTypes.TINYINT, defaultValue: 1 },
    fsyms: { type: DataTypes.STRING, defaultValue: '' },
    tsyms: { type: DataTypes.STRING, defaultValue: '' }
}

const freeTableName =  {
    freezeTableName: true
}

const TradeHistoryModels = db.define('trade_history', attributes, freeTableName);

// TradeHistoryModels.belongsTo(User, {
//     foreignKey: 'userId'
// });
// TradeHistoryModels.belongsTo(AssetsModels, {
//     foreignKey: 'assetId'
// })

module.exports = TradeHistoryModels;