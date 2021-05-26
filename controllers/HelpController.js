const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const HelpService = require('../services/Help');

const getAllHelp = (req, res, next) => {
    HelpService.getAll()
        .then(helps => res.render('admin/help/index', {helps: helps}))
        .catch(next);
}

const apiGetAllHelp = (req, res, next) => {
    HelpService.getAll()
        .then(helps => res.json(helps))
        .catch(next);
}

const getHelpById = (req, res, next) =>{
    HelpService.getById(req.params.id)
        .then(help => res.render('admin/help/update', {help: help}))
        .catch(next);
}

const apiGetHelpById = (req, res, next) =>{
    HelpService.getById(req.params.id)
        .then(help => res.json(help))
        .catch(next);
}

const insertHelp = (req, res, next) => {
    req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    HelpService.insert(req.body)
        .then(() => res.redirect('/api/help'))
        .catch(next);
}

const updateHelp = (req, res, next) =>{
    req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    HelpService.update(req.params.id, req.body)
        .then(help => res.redirect('/api/help'))
        .catch(next);
}

const _deleteHelp = (req, res, next) =>{
    HelpService._delete(req.params.id)
        .then(() => res.redirect('/api/help'))
        .catch(next);
}

module.exports = {
    getAllHelp,
    apiGetAllHelp,
    getHelpById,
    apiGetHelpById,
    insertHelp,
    updateHelp,
    _deleteHelp
}