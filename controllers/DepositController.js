const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const DepositService = require('../services/Deposit');

const getAllDeposit = (req, res, next) => {
    DepositService.getAll()
        .then(deposits => res.render('admin/deposit/index', {deposits}))
        .catch(next);
}

const getDepositById = (req, res, next) =>{
    DepositService.getById(req.params.id)
        .then(deposit => res.render('admin/deposit/update', {deposit}))
        .catch(next);
}

const insertDeposit = (req, res, next) => {
    DepositService.insert(req.body)
        .then(() => res.redirect('/api/deposit'))
        .catch(next);
}

const updateDeposit = (req, res, next) =>{
    DepositService.update(req.params.id, req.body)
        .then(() => res.redirect('/api/deposit'))
        .catch(next);
}

const _deleteDeposit = (req, res, next) =>{
    DepositService._delete(req.params.id)
        .then(() => res.redirect('/api/deposit'))
        .catch(next);
}

module.exports = {
    getAllDeposit,
    getDepositById,
    insertDeposit,
    updateDeposit,
    _deleteDeposit
}