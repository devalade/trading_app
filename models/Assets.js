const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const TradeHistoryModels = require('./TradeHistory');

const attributes = {
    assests_category: { type: DataTypes.STRING, defaultValue: '' },
    assest_name: { type: DataTypes.STRING, defaultValue: '' },
    assest_from: { type: DataTypes.STRING, defaultValue: '' },
    assest_to: { type: DataTypes.STRING, defaultValue: '' },
    base_price: { type: DataTypes.REAL, defaultValue: 0 },
    assests_img: { type: DataTypes.STRING, defaultValue: '' },
    is_active: {type: DataTypes.INTEGER, defaultValue: 1}
};
const freeTableName =  {
    freezeTableName: true
}

const AssetsModels = db.define('assests', attributes, freeTableName);

// AssetsModels.hasMany(TradeHistoryModels, {
//     onDelete: 'RESTRICT'
// });


module.exports = AssetsModels;
