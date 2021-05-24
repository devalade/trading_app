const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const NewsModels = require('../models/News');
console.log(NewsModels);
module.exports = {
    getNewsById,
    getAllNews,
    insertNews,
    updateNews,
    _deleteNews
}

async function getNewsById(id) {
    const news = await NewsModels.findByPk(id);
    if (!news) throw 'News not found';
    return news;
}

async function getAllNews() {
    return await NewsModels.findAll();
}

async function insertNews(params) {
    //
    //validate
    // if ( await NewsModels.findOne({ where: { news_title: params.news_title } })) {
    //     throw 'News title "' + params.news_title + '" is already taken';
    // }

    // // save News
    await  NewsModels.create(params);
}

async function updateNews(id, params) {
    const news = await getNewsById(id);

    // validate
    // const NewsNameChange = params.news_title;
    // if (NewsNameChange && await NewsModels.findOne({ where: { news_title: params.news_title } })) {
    //     throw 'News "' + params.news_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(news, params);
    await news.save();

    return omitHash(news.get());
}

async function _deleteNews(id) {
    const news = await getNewsById(id);
    await news.destroy();
}

