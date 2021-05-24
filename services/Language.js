const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const LanguageModels = require('../models/Language');

module.exports = {
    getById,
    getAll,
    insert,
    update,
    _delete
}

async function getById(id) {
    const language = await LanguageModels.findByPk(id);
    if (!language) throw 'Language not found';
    return language;
}

async function getAll() {
    return await LanguageModels.findAll();
}

async function insert(params) {
    // validate
    if ( await LanguageModels.findOne({ where: { user_name: params.lang_name } })) {
        throw 'Language name "' + params.lang_name + '" is already taken';
    }

    // save language
    await  LanguageModels.create(params);
}

async function update(id, params) {
    const language = await getLanguageById(id);

    // validate
    const langugaeNameChange = params.lang_name;
    if (langugaeNameChange && await LanguageModels.findOne({ where: { lang_name: params.lang_name } })) {
        throw 'Language "' + params.lang_name + '" is already taken';
    }

    // copy params to user and save
    Object.assign(language, params);
    await language.save();

    return language.get();
}

async function _delete(id) {
    const language = await getLanguageById(id);
    await language.destroy();
}

