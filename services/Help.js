const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const HelpModels = require('../models/Help');

module.exports = {
    getById,
    getAll,
    insert,
    update,
    _delete
}

async function getById(id) {
    const assets = await HelpModels.findByPk(id);
    if (!assets) throw 'Help not found';
    return assets;
}

async function getAll() {
    return await HelpModels.findAll();
}

async function insert(params) {
    //
    // validate
    // if ( await HelpModels.findOne({ where: { user_name: params.lang_assets } })) {
    //     throw 'Help name "' + params.user_name + '" is already taken';
    // }

    // // save Help
    await  HelpModels.create(params);
}

async function update(id, params) {
    const Help = await getById(id);

    // validate
    //const assetsNameChange = params.lang_assets;
    // if (assetsNameChange && await HelpModels.findOne({ where: { lang_assets: params.news_title } })) {
    //     throw 'Help "' + params.news_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(Help, params);
    await Help.save();

    return Help.get();
}

async function _delete(id) {
    const Help = await getById(id);
    await Help.destroy();
}

