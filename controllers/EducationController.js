const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const EducationService = require('../services/Education');

const getAllEducation = (req, res, next) => {
    EducationService.getAll()
        .then(educations => res.render('admin/education/index', {educations}))
        .catch(next);
}

const apiGetAllEducation = (req, res, next) => {
    EducationService.getAll()
        .then(educations => res.json(educations))
        .catch(next);
}

const getEducationById = (req, res, next) =>{
    EducationService.getById(req.params.id)
        .then(education => res.render('admin/education/update', {education}))
        .catch(next);
}

const apiGetEducationById = (req, res, next) =>{
    EducationService.getById(req.params.id)
        .then(education => res.json({education}))
        .catch(next);
}

const insertEducation = (req, res, next) => {
    EducationService.insert(req.body)
        .then(() => res.redirect('/api/education'))
        .catch(next);
}

const updateEducation = (req, res, next) =>{
    EducationService.update(req.params.id, req.body)
        .then(education => res.redirect('/api/education'))
        .catch(next);
}

const _deleteEducation = (req, res, next) =>{
    EducationService.delete(req.params.id)
        .then(() => res.redirect('/api/education'))
        .catch(next);
}

module.exports = {
    getAllEducation,
    apiGetAllEducation,
    getEducationById,
    apiGetEducationById,
    insertEducation,
    updateEducation,
    _deleteEducation
}