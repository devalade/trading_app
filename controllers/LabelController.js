const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const LabelService = require('../services/Label');

const getAllLabel = (req, res, next) => {
    LabelService.getAllLabel()
        .then(label => res.json(label))
        .catch(next);
}

const apiGetAllLabel = (req, res, next) => {
    LabelService.getAllLabel()
        .then(label => res.json(label))
        .catch(next);
}

const getLabelById = (req, res, next) =>{
    LabelService.getById(req.params.id)
        .then(label => res.json(label))
        .catch(next);
}

const apiGetLabelById = (req, res, next) =>{
    LabelService.getById(req.params.id)
        .then(label => res.json(label))
        .catch(next);
}

const insertLabel = (req, res, next) => {
    LabelService.create(req.body)
        .then(() => res.json('Insertion de label ...'))
        .catch(next);
}

const updateLabel = (req, res, next) =>{
    LabelService.update(req.params.id, req.body)
        .then(label => res.json(label))
        .catch(next);
}

const _deleteLabel = (req, res, next) =>{
    LabelService.delete(req.params.id)
        .then(() => res.json({ message: 'Label deleted successfully' }))
        .catch(next);
}

module.exports = {
    getAllLabel,
    apiGetAllLabel,
    getLabelById,
    apiGetLabelById,
    insertLabel,
    updateLabel,
    _deleteLabel
}