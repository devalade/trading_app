const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const WithdrawService = require('../services/Withdraw');

const getAllWithdraw = (req, res, next) => {
    WithdrawService.getAllWithdraw()
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const apiGetAllWithdraw = (req, res, next) => {
    WithdrawService.getAllWithdraw()
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const getWithdrawById = (req, res, next) =>{
    WithdrawService.getWithdrawById(req.params.id)
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const apiGetWithdrawById = (req, res, next) =>{
    WithdrawService.getWithdrawById(req.params.id)
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const insertWithdraw = (req, res, next) => {
    WithdrawService.insertWithdraw(req.body)
        .then(() => res.json({message : 'Insert withdraw ...'}))
        .catch(next);
}

const apiInsertWithdraw = (req, res, next) => {
    WithdrawService.insertWithdraw(req.body)
        .then(() => res.json('Insertion de withdraw ...'))
        .catch(next);
}

const updateWithdraw = (req, res, next) =>{
    WithdrawService.updateWithdraw(req.params.id, req.body)
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const _deleteWithdraw = (req, res, next) =>{
    WithdrawService._deleteWithdraw(req.params.id)
        .then(() => res.json({ message: 'Withdraw deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllWithdraw,
    apiGetAllWithdraw,
    getWithdrawById,
    apiGetWithdrawById,
    insertWithdraw,
    updateWithdraw,
    _deleteWithdraw
}