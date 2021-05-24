const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const DepositModels = require('../models/Deposit');

module.exports = {
    getById,
    getAll,
    insert,
    update,
    _delete
}

async function getById(id) {
    const deposit = await DepositModels.findByPk(id);
    if (!deposit) throw 'Deposit not found';
    return deposit;
}

async function getAll() {
    return await DepositModels.findAll();
}

async function insert(params) {
    //
    // validate
    // if ( await DepositModels.findOne({ where: { user_name: params.lang_deposit } })) {
    //     throw 'Deposit name "' + params.user_name + '" is already taken';
    // }

    // // save Deposit
    await  DepositModels.create(params);
}

async function update(id, params) {
    const Deposit = await getById(id);

    // validate
    //const depositNameChange = params.lang_deposit;
    // if (depositNameChange && await DepositModels.findOne({ where: { lang_deposit: params.news_title } })) {
    //     throw 'Deposit "' + params.news_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(Deposit, params);
    await Deposit.save();

    return Deposit.get();
}

async function _delete(id) {
    const Deposit = await getById(id);
    await Deposit.destroy();
}

