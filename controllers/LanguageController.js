const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const LanguageService = require('../services/Language');

const getAllLanguage = (req, res, next) => {
    LanguageService.getAll()
        .then(languages => res.render('admin/language/index', {languages}))
        .catch(next);
}

const getLanguageById = (req, res, next) =>{
    LanguageService.getById(req.params.id)
        .then(language => res.render('admin/language/update', language))
        .catch(next);
}

const insertLanguage = (req, res, next) => {
    LanguageService.insert(req.body)
        .then(() => res.redirect('/api/language'))
        .catch(next);
}

const updateLanguage = (req, res, next) =>{
    LanguageService.update(req.params.id, req.body)
        .then(() => res.redirect('/api/language'))
        .catch(next);
}

const _deleteLanguage = (req, res, next) =>{
    LanguageService.delete(req.params.id)
        .then(() => res.redirect('/api/language'))
        .catch(next);
}

module.exports = {
    getAllLanguage,
    getLanguageById,
    insertLanguage,
    updateLanguage,
    _deleteLanguage
}