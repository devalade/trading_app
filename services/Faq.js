const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const FaqModels = require('../models/Faq');

module.exports = {
    getFaqById,
    getAllFaq,
    insertFaq,
    updateFaq,
    _deleteFaq
}

async function getFaqById(id) {
    const faq = await FaqModels.findByPk(id);
    if (!faq) throw 'Faq not found';
    return faq;
}

async function getAllFaq() {
    FaqModels.findAll().then(faq => console.log(res.json(faq)));
    return await FaqModels.findAll();
}

async function insertFaq(params) {
    // // save Faq
    await  FaqModels.create(params);
}

async function updateFaq(id, params) {
    console.log(id, params);
    const Faq = await getFaqById(id);

    // copy params to user and save
    Object.assign(Faq, params);
    await Faq.save();

    return Faq.get();
}

async function _deleteFaq(id) {
    const Faq = await getFaqById(id);
    await Faq.destroy();
}

