// const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const attributes = {
    news_title: { type: DataTypes.STRING, defaultValue: '' },
    news_desc: { type: DataTypes.STRING, defaultValue: '' },
    video_url: { type: DataTypes.STRING, defaultValue: '' },
    is_active: { type: DataTypes.INTEGER, defaultValue: 1 }
}

const freeTableName =  {
    freezeTableName: true
}

const NewsModels = db.define('news', attributes, freeTableName);

module.exports = NewsModels;
