const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const DepositService = require('../services/Deposit');

const getAllDeposit = (req, res, next) => {
    DepositService.getAll()
        .then(deposits => res.render('admin/deposit/index', {deposits}))
        .catch(next);
}

const apiGetAllDeposit = (req, res, next) => {
    DepositService.getAll()
        .then(deposits => res.json(deposits))
        .catch(next);
}

const getDepositById = (req, res, next) =>{
    DepositService.getById(req.params.id)
        .then(deposit => res.render('admin/deposit/update', {deposit}))
        .catch(next);
}

const apiGetDepositById = (req, res, next) =>{
    DepositService.getById(req.params.id)
        .then(deposit => res.json( deposit))
        .catch(next);
}

const insertDeposit = (req, res, next) => {
    DepositService.insert(req.body)
        .then(() => res.redirect('/api/deposit'))
        .catch(next);
}

const apiInsertDeposit = (req, res, next) => {
    DepositService.insert(req.body)
        .then(() => res.json("Depisit successful"))
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
    apiGetAllDeposit,
    getDepositById,
    apiGetDepositById,
    insertDeposit,
    apiInsertDeposit,
    updateDeposit,
    _deleteDeposit
}