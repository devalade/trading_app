const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const NewsService = require('../services/News');

const getAllNews = (req, res, next) => {
    NewsService.getAll()
        .then(news => res.json(news))
        .catch(next);
}

const getNewsById = (req, res, next) =>{
    NewsService.getById(req.params.id)
        .then(news => res.json(news))
        .catch(next);
}

const insertNews = (req, res, next) => {
    NewsService.create(req.body)
        .then(() => res.json('Insertion de news ...'))
        .catch(next);
}

const updateNews = (req, res, next) =>{
    NewsService.update(req.params.id, req.body)
        .then(news => res.json(news))
        .catch(next);
}

const _deleteNews = (req, res, next) =>{
    NewsService.delete(req.params.id)
        .then(() => res.json({ message: 'News deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllNews,
    getNewsById,
    insertNews,
    updateNews,
    _deleteNews
}