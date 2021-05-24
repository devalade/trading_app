const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const WithdrawModels = require('../models/Withdraw');
const UserModels = require('../models/User');

WithdrawModels.belongsTo(UserModels, {
    foreignKey: 'userId'
});

// (async function () {
//     let data = await WithdrawModels.findAll( {include: [UserModels]
//   });
//     console.log(data);
// })()

module.exports = {
    getWithdrawById,
    getAllWithdraw,
    insertWithdraw,
    updateWithdraw,
    _deleteWithdraw
}

async function getWithdrawById(id) {
    const paytm = await WithdrawModels.findByPk(id);
    if (!paytm) throw 'Withdraw not found';
    return paytm;
}

async function getAllWithdraw() {
    return await WithdrawModels.findAll();
}

async function insertWithdraw(params) {
    //
    // validate
    // if ( await WithdrawModels.findOne({ where: { user_name: params.lang_paytm } })) {
    //     throw 'Withdraw name "' + params.user_name + '" is already taken';
    // }

    // // save Withdraw
    await  WithdrawModels.create(params);
}

async function updateWithdraw(id, params) {
    const Withdraw = await getWithdrawById(id);

    // validate
    //const paytmNameChange = params.lang_paytm;
    // if (paytmNameChange && await WithdrawModels.findOne({ where: { lang_paytm: params.news_title } })) {
    //     throw 'Withdraw "' + params.news_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(Withdraw, params);
    await Withdraw.save();

    return omitHash(Withdraw.get());
}

async function _deleteWithdraw(id) {
    const Withdraw = await getWithdrawById(id);
    await Withdraw.destroy();
}