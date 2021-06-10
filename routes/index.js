const express = require('express');
const router = express.Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/auth');

const passport = require('passport');
const UserController = require('../controllers/UserController');
const LanguageController = require('../controllers/LanguageController');

const LabelController = require('../controllers/LabelController');

const  News = require('../controllers/NewsController');

const EducationController = require('../controllers/EducationController');

const  FaqController = require('../controllers/FaqController');

const AssetsController = require('../controllers/AssetsController');

const HelpController = require('../controllers/HelpController');

const DepositController  = require('../controllers/DepositController');

const {
    getAllPaytm,
    getPaytmById,
    insertPaytm,
    updatePaytm,
    _deletePaytm
} = require('../controllers/PaytmController');
// const { create } = require('../services/User');
const WithdrawController = require('../controllers/WithdrawController');
const TradeHistoryController = require('../controllers/TradeHistoryController');
const ApiRequestController = require('../controllers/ApiRequestController');


// routes
router.get('/login',  (req, res) => {res.render('auth/login')});
// router.post('/login', login);
// Login
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/register', UserController.getRegister);
router.post('/register', UserController.register);
// router.get('/', authorize(), getAll);
// router.get('/current', authorize(), getCurrent);
// router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), update);
// router.delete('/:id', authorize, _delete);

// router.get('/admin_login', adminLogin);
// router.get('/change_password', changePassword);
// router.get('/update_admin_password', updateAdminPassword);
// router.get('/push_notification', pushNotification);
// router.get('/admin_logout', adminLogout);

router.get('404_override', (req, res) => res.send('404'));
// router.get('/translate_uri_dashes')

/*********Android API */
router.post('/app_login', UserController.apiLogin);
router.post('/app_register', UserController.apiRegister);

router.get('/getLanguages', LanguageController.apiGetAllLanguage);
router.get('/get_news', News.apiGetAllNews);
router.get('/get_education', EducationController.apiGetAllEducation );
router.get('/get_faq', FaqController.apiGetAllFaq);
router.get('/get_help', HelpController.apiGetAllHelp);
router.get('/getLanguage_labels', LabelController.apiGetAllLabel);

// router.get('/paytm_api') // Implementer 
// router.get('/skrill_api_payment') // Implementer
router.get('/money_deposit_user')
// router.get('/kyc_verification')
// router.get('/profile_pic') //Image de profile pas encore gerer
// router.get('/withdraw_api') //
router.get('/forgot_password', UserController.forgotPassword)
// router.get('/change_security') // Change password
// router.get('/change_user_auth') // 
router.get('/user_logout' ,UserController.logout)
router.get('/update_profile', UserController.update)
        // router.get('/buy_sell'ensureAuthenticated, )
router.get('/assests_api', AssetsController.getAllAssets);
router.get('/close_api', ApiRequestController.closePrice);
router.get('/get_trade_history/:id', TradeHistoryController.apiGetTradeHistoryById);
        // router.get('/auto_close_trade')
        // router.get('/log')
router.get('/trade_data/:fsym&:tsym:&limit',  ApiRequestController.tradeData)
router.get('/history_data/:fsym&:tsym')
router.get('/get_payment_history')
// router.get('/get_analytics_data')
// router.get('/manage_user_settings')
router.get('/get_user_data/:id', UserController.apiGetById);
router.get('/get_deposit_hint_data/:id', DepositController.apiGetDepositById);




// /********************** CRUD operation *************************/

// /******** Languages Crud ***************/
router.get('/language', LanguageController.getAllLanguage);
router.get('/language/insert', (req, res) => {res.render('admin/language/insert')});
router.post('/language/insert', LanguageController.insertLanguage);
router.get('/language/delete/:id', LanguageController._deleteLanguage);
router.get('/language/update/:id', LanguageController.getLanguageById);
router.post('/language/update/:id', LanguageController.updateLanguage);

// /* Language Label Crud */
router.get('/language_label', LabelController.getAllLabel);
router.post('/insertlang_label', LabelController.insertLabel);
router.delete('/deletelang_label', LabelController._deleteLabel);
router.get('/getlang_labelDetails', LabelController.getLabelById);
router.put('/updatelang_labelDetails',LabelController.updateLabel);

// /********** News *********/
router.get('/news',News.getAllNews);
router.post('/insert_news', News.insertNews);
router.delete('/delete_news', News._deleteNews);
router.get('/get_news_details', News.getNewsById);
router.put('/update_news_details', News.updateNews);

// /********** Education *********/
router.get('/education', EducationController.getAllEducation);
router.get('/education/insert', (req, res) => {res.render('admin/education/insert')});
router.post('/education/insert', EducationController.insertEducation);
router.get('/education/delete/:id', EducationController._deleteEducation);
router.get('/education/update/:id',EducationController.getEducationById);
router.post('/education/update/:id', EducationController.updateEducation);


// /********** faq *********/
router.get('/faq', FaqController.getAllFaq);
router.get('/faq/insert', (req, res) => { res.render('admin/faq/insert') });
router.post('/faq/insert', FaqController.insertFaq);
router.get('/faq/delete/:id', FaqController._deleteFaq);
router.get('/faq/:id', FaqController.getFaqById);
router.post('/faq/update/:id', FaqController.updateFaq);


// /********** Assets *********/
router.get('/assets_data', AssetsController.getAllAssets);
router.post('/insert_assets', AssetsController.insertAssets);
router.delete('/delete_assets', AssetsController._deleteAssets);
router.get('/get_assets_details', AssetsController.getAssetsById);
router.put('/update_assets_details', AssetsController.updateAssets);

// /********** help *********/
router.get('/help', HelpController.getAllHelp);
router.post('/help/insert', HelpController.insertHelp);
router.get('/help/insert', (req, res) => {res.render('admin/help/insert')});
router.get('/help/delete/:id', HelpController._deleteHelp);
router.get('/help/:id', HelpController.getHelpById);
router.post('/help/update/:id', HelpController.updateHelp);

// /********** Deposit *********/
router.get('/deposit', DepositController.getAllDeposit);
router.get('/deposit/insert', (req, res) => {res.render('admin/deposit/insert')});
router.post('/deposit/insert', DepositController.insertDeposit);
router.get('/deposit/delete/:id', DepositController._deleteDeposit);
router.get('/deposit/update/:id', DepositController.getDepositById);
router.post('/deposit/update/:id', DepositController.updateDeposit);

// /********** Paytm *********/
router.get('/paytm_transcation', getAllPaytm);
router.post('/insert_paytm_transcation', insertPaytm);
router.delete('/delete_paytm_transcation', _deletePaytm);
router.get('/get_paytm_transcation_details', getPaytmById);
router.put('/update_paytm_transcation_details', updatePaytm);

// /********** Users *********/
router.get('/user',UserController.getAll);
router.get('/user/create', (req, res) => {res.render('admin/users/create')});
router.post('/user/create',UserController.create);
router.get('/user/delete/:id', UserController._delete);
router.get('/user/show/:id', UserController.showById);
router.get('/user/:id', UserController.getById);
router.get('/user/update/:id', UserController.update);


// /********** Withdraw *********/
router.get('/withdraw', WithdrawController.getAllWithdraw);
router.post('/insert_withdraw', WithdrawController.insertWithdraw);
router.delete('/delete_withdraw', WithdrawController._deleteWithdraw);
router.get('/get_withdraw_details', WithdrawController.getWithdrawById);
router.put('/update_withdraw_details', WithdrawController.updateWithdraw);

/********** Trade History *********/
router.get('/trade_history', TradeHistoryController.getAllTradeHistory);
router.get('/trade_history/create', (req, res) => { res.render('admin/users/create') });
router.post('/trade_history/create', TradeHistoryController.insertTradeHistory);
router.get('/trade_history/delete/:id', TradeHistoryController._deleteTradeHistory);
router.get('/trade_history/update/:id', TradeHistoryController.getTradeHistoryById);
router.post('/trade_history/update/:id', TradeHistoryController.updateTradeHistory);

// /********** Payment History *********/
// router.get('payment_history')


// /********** Admin KYC Verfication *********/
// router.get('admin_kyc')
// router.delete('delete_admin_kyc')
// router.get('get_admin_kyc_details')
// router.get('update_admin_kyc_details')


// /********** settings *********/
// router.get('settings')
// router.get('update_settings_details')


module.exports = router;
