const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const PaytmService = require('../services/Paytm');

const getAllPaytm = (req, res, next) => {
    PaytmService.getAllPaytm()
        .then(paytm => res.json(paytm))
        .catch(next);
}

const getPaytmById = (req, res, next) =>{
    PaytmService.getPaytmById(req.params.id)
        .then(paytm => res.json(paytm))
        .catch(next);
}

const insertPaytm = (req, res, next) => {
    PaytmService.insertPaytm(req.body)
        .then(() => res.json('Insertion de paytm ...'))
        .catch(next);
}

const updatePaytm = (req, res, next) =>{
    PaytmService.updatePaytm(req.params.id, req.body)
        .then(paytm => res.json(paytm))
        .catch(next);
}

const _deletePaytm = (req, res, next) =>{
    PaytmService._deletePaytm(req.params.id)
        .then(() => res.json({ message: 'Paytm deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllPaytm,
    getPaytmById,
    insertPaytm,
    updatePaytm,
    _deletePaytm
}