const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const LabelModels = require('../models/Label');

module.exports = {
    getLabelById,
    getAllLabel,
    insertLabel,
    updateLabel,
    _deleteLabel
}

async function getLabelById(id) {
    const label = await LabelModels.findByPk(id);
    if (!label) throw 'Label not found';
    return label;
}

async function getAllLabel() {
    return await LabelModels.findAll();
}

async function insertLabel(params) {
    //
    // validate
    // if ( await LabelModels.findOne({ where: { user_name: params.lang_label } })) {
    //     throw 'Label name "' + params.user_name + '" is already taken';
    // }

    // // save Label
    await  LabelModels.create(params);
}

async function updateLabel(id, params) {
    const Label = await getLabelById(id);

    // // validate
    // const labelNameChange = params.lang_label;
    // if (labelNameChange && await LabelModels.findOne({ where: { lang_label: params.lang_label } })) {
    //     throw 'Label "' + params.lang_label + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(Label, params);
    await Label.save();

    return omitHash(Label.get());
}

async function _deleteLabel(id) {
    const Label = await getLabelById(id);
    await Label.destroy();
}

