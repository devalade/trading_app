const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const TradeHistoryModels = require('../models/TradeHistory');

module.exports = {
    getTradeHistoryById,
    getAllTradeHistory,
    insertTradeHistory,
    updateTradeHistory,
    _deleteTradeHistory
}

async function getTradeHistoryById(id) {
    const tradeHistory = await TradeHistoryModels.findByPk(id);
    if (!tradeHistory) throw 'TradeHistory not found';
    return tradeHistory;
}


async function getAllTradeHistory() {
    return await TradeHistoryModels.findAll();
}


async function insertTradeHistory(params) {
    console.log(params);
    //
    //validate
    // if ( await TradeHistoryModels.findOne({ where: { tradeHistory_title: params.tradeHistory_title } })) {
    //     throw 'TradeHistory title "' + params.tradeHistory_title + '" is already taken';
    // }

    // // save TradeHistory
    return await  TradeHistoryModels.create(params);
}

async function updateTradeHistory(id, params) {
    const tradeHistory = await getTradeHistoryById(id);

    // validate
    // const TradeHistoryNameChange = params.tradeHistory_title;
    // if (TradeHistoryNameChange && await TradeHistoryModels.findOne({ where: { tradeHistory_title: params.tradeHistory_title } })) {
    //     throw 'TradeHistory "' + params.tradeHistory_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(tradeHistory, params);
    await tradeHistory.save();

    return omitHash(tradeHistory.get());
}

async function _deleteTradeHistory(id) {
    const tradeHistory = await getTradeHistoryById(id);
    await tradeHistory.destroy();
}