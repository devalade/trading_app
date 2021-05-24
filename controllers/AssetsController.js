const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const AssetsService = require('../services/Assets');

const getAllAssets = (req, res, next) => {
    AssetsService.getAllAssets()
        .then(assets => res.json(assets))
        .catch(next);
}

const getAssetsById = (req, res, next) =>{
    AssetsService.getById(req.params.id)
        .then(assets => res.json(assets))
        .catch(next);
}

const insertAssets = (req, res, next) => {
    AssetsService.create(req.body)
        .then(() => res.json('Insertion de assets ...'))
        .catch(next);
}

const updateAssets = (req, res, next) =>{
    AssetsService.update(req.params.id, req.body)
        .then(assets => res.json(assets))
        .catch(next);
}

const _deleteAssets = (req, res, next) =>{
    AssetsService.delete(req.params.id)
        .then(() => res.json({ message: 'Assets deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllAssets,
    getAssetsById,
    insertAssets,
    updateAssets,
    _deleteAssets
}