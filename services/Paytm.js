const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const PaytmModels = require('../models/Paytm');

module.exports = {
    getPaytmById,
    getAllPaytm,
    insertPaytm,
    updatePaytm,
    _deletePaytm
}

async function getPaytmById(id) {
    const paytm = await PaytmModels.findByPk(id);
    if (!paytm) throw 'Paytm not found';
    return paytm;
}

async function getAllPaytm() {
    return await PaytmModels.findAll();
}

async function insertPaytm(params) {
    //
    // validate
    // if ( await PaytmModels.findOne({ where: { user_name: params.lang_paytm } })) {
    //     throw 'Paytm name "' + params.user_name + '" is already taken';
    // }

    // // save Paytm
    await  PaytmModels.create(params);
}

async function updatePaytm(id, params) {
    const Paytm = await getPaytmById(id);

    // validate
    //const paytmNameChange = params.lang_paytm;
    // if (paytmNameChange && await PaytmModels.findOne({ where: { lang_paytm: params.news_title } })) {
    //     throw 'Paytm "' + params.news_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(Paytm, params);
    await Paytm.save();

    return omitHash(Paytm.get());
}

async function _deletePaytm(id) {
    const Paytm = await getPaytmById(id);
    await Paytm.destroy();
}