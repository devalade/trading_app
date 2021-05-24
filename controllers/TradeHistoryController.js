const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const TradeHistoryModels = require('../models/TradeHistory');

const getAllTradeHistory = (req, res, next) => {
    tradeHistoryService.getAll()
        .then(tradeHistory => res.json(tradeHistory))
        .catch(next);
}

const getTradeHistoryById = (req, res, next) =>{
    TradeHistoryService.getById(req.params.id)
        .then(tradeHistory => res.json(tradeHistory))
        .catch(next);
}

const insertTradeHistory = (req, res, next) => {
    TradeHistoryService.create(req.body)
        .then(() => res.json('Insertion de tradeHistory ...'))
        .catch(next);
}

const updateTradeHistory = (req, res, next) =>{
    TradeHistoryService.update(req.params.id, req.body)
        .then(tradeHistory => res.json(tradeHistory))
        .catch(next);
}

const _deleteTradeHistory = (req, res, next) =>{
    TradeHistoryService.delete(req.params.id)
        .then(() => res.json({ message: 'TradeHistory deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllTradeHistory,
    getTradeHistoryById,
    insertTradeHistory,
    updateTradeHistory,
    _deleteTradeHistory
}