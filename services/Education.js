const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const EducationModels = require('../models/Education');

console.log(EducationModels)
module.exports = {
    getById,
    getAll,
    insert,
    update,
    _delete
}

async function getById(id) {
    const education = await EducationModels.findByPk(id);
    if (!education) throw 'Education not found';
    return education;
}

async function getAll() {
    return await EducationModels.findAll();
}

async function insert(params) {
    //
    // validate
    // if ( await EducationModels.findOne({ where: { user_name: params.lang_education } })) {
    //     throw 'Education name "' + params.user_name + '" is already taken';
    // }

    // // save Education
    await  EducationModels.create(params);
}

async function update(id, params) {
    const Education = await getEducationById(id);

    // validate
    //const educationNameChange = params.lang_education;
    // if (educationNameChange && await EducationModels.findOne({ where: { lang_education: params.news_title } })) {
    //     throw 'Education "' + params.news_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(Education, params);
    await Education.save();

    return Education.get();
}

async function _delete(id) {
    const Education = await getEducationById(id);
    await Education.destroy();
}

