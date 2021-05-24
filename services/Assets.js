const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const AssetsModels = require('../models/Assets');
const TradeHistoryModels = require('../models/TradeHistory');

TradeHistoryModels.belongsTo(AssetsModels, {
    foreignKey: 'assetId'
});

// (async function () {
//     let data = await TradeHistoryModels.findAll( {include: ['asset']
//   });
//     console.log(data);
// })()

console.log(AssetsModels);
module.exports = {
    getAssetsById,
    getAllAssets,
    insertAssets,
    updateAssets,
    _deleteAssets
}

async function getAssetsById(id) {
    const assets = await AssetsModels.findByPk(id);
    if (!assets) throw 'Assets not found';
    return assets;
}

async function getAllAssets() {
    return await AssetsModels.findAll();
}


async function insertAssets(params) {
    //
    // validate
    // if ( await AssetsModels.findOne({ where: { user_name: params.lang_assets } })) {
    //     throw 'Assets name "' + params.user_name + '" is already taken';
    // }

    // // save Assets
    await  AssetsModels.create(params);
}

async function updateAssets(id, params) {
    const Assets = await getAssetsById(id);

    // validate
    //const assetsNameChange = params.lang_assets;
    // if (assetsNameChange && await AssetsModels.findOne({ where: { lang_assets: params.news_title } })) {
    //     throw 'Assets "' + params.news_title + '" is already taken';
    // }

    // copy params to user and save
    Object.assign(Assets, params);
    await Assets.save();

    return omitHash(Assets.get());
}

async function _deleteAssets(id) {
    const Assets = await getAssetsById(id);
    await Assets.destroy();
}

