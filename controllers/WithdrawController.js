const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const WithdrawService = require('../services/Withdraw');

const getAllWithdraw = (req, res, next) => {
    WithdrawService.getAll()
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const getWithdrawById = (req, res, next) =>{
    WithdrawService.getById(req.params.id)
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const insertWithdraw = (req, res, next) => {
    WithdrawService.create(req.body)
        .then(() => res.json('Insertion de withdraw ...'))
        .catch(next);
}

const updateWithdraw = (req, res, next) =>{
    WithdrawService.update(req.params.id, req.body)
        .then(withdraw => res.json(withdraw))
        .catch(next);
}

const _deleteWithdraw = (req, res, next) =>{
    WithdrawService.delete(req.params.id)
        .then(() => res.json({ message: 'Withdraw deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllWithdraw,
    getWithdrawById,
    insertWithdraw,
    updateWithdraw,
    _deleteWithdraw
}