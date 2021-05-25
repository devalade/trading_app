const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const FaqService = require('../services/Faq');

const getAllFaq = (req, res, next) => {
     FaqService.getAllFaq()
            .then(faq => res.render('admin/faq/index', {faq: faq}))
            .catch(next);
    
}

const apiGetAllFaq = (req, res, next) => {
     FaqService.getAllFaq()
            .then(faq => res.json(faq))
            .catch(next);
}

const getFaqById = (req, res, next) =>{
    FaqService.getFaqById(req.params.id)
        .then(faq => res.render('admin/faq/update', {faq: faq}))
        .catch(next);
}

const apiGetFaqById = (req, res, next) =>{
    FaqService.getFaqById(req.params.id)
            .then(faq => res.json(faq))
        .catch(next);
}

const insertFaq = (req, res, next) => {
    req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    FaqService.insertFaq(req.body)
        .then(() => res.redirect('/api/faq'))
        .catch(next);
}

const updateFaq = (req, res, next) => {
    req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    FaqService.updateFaq(req.params.id, req.body)
        .then(() => res.redirect('/api/faq'))
        .catch(next);
}

const _deleteFaq = (req, res, next) =>{
    FaqService._deleteFaq(req.params.id)
        .then(() => res.redirect('/api/faq'))
        .catch(next);
}

module.exports = {
    getAllFaq,
    apiGetAllFaq,
    getFaqById,
    apiGetFaqById,
    insertFaq,
    updateFaq,
    _deleteFaq
}