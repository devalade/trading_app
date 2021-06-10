const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const NewsService = require('../services/News');

const getAllNews = (req, res, next) => {
    NewsService.getAllNews()
        .then(news => res.json(news))
        .catch(next);
}

const apiGetAllNews = (req, res, next) => {
    NewsService.getAllNews()
        .then(news => res.json(news))
        .catch(next);
}

const getNewsById = (req, res, next) =>{
    NewsService.getNewsById(req.params.id)
        .then(news => res.json(news))
        .catch(next);
}

const apiGetNewsById = (req, res, next) =>{
    NewsService.getNewsById(req.params.id)
        .then(news => res.json(news))
        .catch(next);
}

const insertNews = (req, res, next) => {
    NewsService.insertNews(req.body)
        .then(() => res.json({message: 'Insertion de news ...'}))
        .catch(next);
}

const updateNews = (req, res, next) =>{
    NewsService.updateNews(req.params.id, req.body)
        .then(news => res.json(news))
        .catch(next);
}

const _deleteNews = (req, res, next) =>{
    NewsService._deleteNews(req.params.id)
        .then(() => res.json({ message: 'News deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllNews,
    apiGetAllNews,
    getNewsById,
    apiGetNewsById,
    insertNews,
    updateNews,
    _deleteNews
}