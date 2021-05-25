const express = require('express');
const router = express.Router();
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/auth');

const passport = require('passport');
const UserController = require('../controllers/UserController');
const {
    getAllLanguage,
    getLanguageById,
    insertLanguage,
    updateLanguage,
    _deleteLanguage
} = require('../controllers/LanguageController');

const {
    getAllLabel,
    getLabelById,
    insertLabel,
    updateLabel,
    _deleteLabel
} = require('../controllers/LabelController');

const {
    getAllNews,
    getNewsById,
    insertNews,
    updateNews,
    _deleteNews
} = require('../controllers/NewsController');

const {
    getAllEducation,
    getEducationById,
    insertEducation,
    updateEducation,
    _deleteEducation
} = require('../controllers/EducationController');

const {
    getAllFaq,
    getFaqById,
    insertFaq,
    updateFaq,
    _deleteFaq
} = require('../controllers/FaqController');

const {
    getAllAssets,
    getAssetsById,
    insertAssets,
    updateAssets,
    _deleteAssets
} = require('../controllers/AssetsController');

const {
    getAllHelp,
    getHelpById,
    insertHelp,
    updateHelp,
    _deleteHelp
} = require('../controllers/HelpController');

const {
    getAllDeposit,
    getDepositById,
    insertDeposit,
    updateDeposit,
    _deleteDeposit
} = require('../controllers/DepositController');

const {
    getAllPaytm,
    getPaytmById,
    insertPaytm,
    updatePaytm,
    _deletePaytm
} = require('../controllers/PaytmController');
// const { create } = require('../services/User');
const {
    getAllWithdraw,
    getWithdrawById,
    insertWithdraw,
    updateWithdraw,
    _deleteWithdraw
} = require('../controllers/WithdrawController');



// routes
router.get('/login', forwardAuthenticated ,  (req, res) => {res.render('auth/login')});
// router.post('/login', login);
// Login
router.post('/login', forwardAuthenticated, UserController.login);
router.post('/logout', ensureAuthenticated , UserController.logout);
router.get('/register', forwardAuthenticated,UserController.getRegister);
router.post('/register', forwardAuthenticated,UserController.register);
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
router.post('/app_login', UserController.login);
// router.post('/app_login', UserController.login);

router.get('/getLanguages', passport.authenticate('jwt', { session: false }) ,getAllLanguage);
router.get('/get_news', getAllNews);
router.get('/get_education', getAllEducation);
router.get('/get_faq', getAllFaq);
router.get('/get_help', getAllHelp);
router.get('/getLanguage_labels', getAllLabel);
// router.get('/paytm_api')
// router.get('/skrill_api_payment')
// router.get('/money_deposit_user')
// router.get('/kyc_verification')
// router.get('/profile_pic')
// router.get('/withdraw_api')
// router.get('/forgot_password')
// router.get('/change_security')
// router.get('/change_user_auth')
router.get('/user_logout', ensureAuthenticated ,UserController.logout)
// router.get('/update_profile')
// router.get('/buy_sell'ensureAuthenticated, )
router.get('/assests_api', getAllAssets);
// router.get('/get_trade_history', )
// router.get('/close_api')
// router.get('/auto_close_trade')
// router.get('/log')
// router.get('/trade_data')
// router.get('/history_data')
// router.get('/get_payment_history')
// router.get('/get_analytics_data')
// router.get('/manage_user_settings')
// router.get('/get_user_data',ensureAuthenticated, getCurrent);
// router.get('/get_deposit_hint_data')

// /********************** CRUD operation *************************/

// /******** Languages Crud ***************/
router.get('/language', getAllLanguage);
router.get('/language/insert', (req, res) => {res.render('admin/language/insert')});
router.post('/language/insert', insertLanguage);
router.get('/language/delete/:id', _deleteLanguage);
router.get('/language/update/:id', getLanguageById);
router.post('/language/update/:id', updateLanguage);

// /* Language Label Crud */
router.get('/language_label', getAllLabel);
router.post('/insertlang_label', insertLabel);
router.delete('/deletelang_label', _deleteLabel);
router.get('/getlang_labelDetails', getLabelById);
router.put('/updatelang_labelDetails',updateLabel);

// /********** News *********/
router.get('/news', getAllNews);
router.post('/insert_news', insertNews);
router.delete('/delete_news', _deleteNews);
router.get('/get_news_details', getNewsById);
router.put('/update_news_details', updateNews);

// /********** Education *********/
router.get('/education', getAllEducation);
router.get('/education/insert', (req, res) => {res.render('admin/education/insert')});
router.post('/education/insert', insertEducation);
router.get('/education/delete/:id', _deleteEducation);
router.get('/education/update/:id', getEducationById);
router.post('/education/update/:id', updateEducation);


// /********** faq *********/
router.get('/faq', getAllFaq);
router.get('/faq/insert', (req, res) => { res.render('admin/faq/insert') });
router.post('/faq/insert', insertFaq);
router.get('/faq/delete/:id', _deleteFaq);
router.get('/faq/:id', getFaqById);
router.post('/faq/update/:id', updateFaq);


// /********** Assets *********/
router.get('/assets_data', getAllAssets);
router.post('/insert_assets', insertAssets);
router.delete('/delete_assets', _deleteAssets);
router.get('/get_assets_details', getAssetsById);
router.put('/update_assets_details', updateAssets);

// /********** help *********/
router.get('/help', getAllHelp);
router.post('/help/insert', insertHelp);
router.get('/help/insert', (req, res) => {res.render('admin/help/insert')});
router.get('/help/delete/:id', _deleteHelp);
router.get('/help/:id', getHelpById);
router.post('/help/update/:id', updateHelp);

// /********** Deposit *********/
router.get('/deposit', getAllDeposit);
router.get('/deposit/insert', (req, res) => {res.render('admin/deposit/insert')});
router.post('/deposit/insert', insertDeposit);
router.get('/deposit/delete/:id', _deleteDeposit);
router.get('/deposit/update/:id', getDepositById);
router.post('/deposit/update/:id', updateDeposit);

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
router.get('/withdraw', getAllWithdraw);
router.post('/insert_withdraw', insertWithdraw);
router.delete('/delete_withdraw', _deleteWithdraw);
router.get('/get_withdraw_details', getWithdrawById);
router.put('/update_withdraw_details', updateWithdraw);

// /********** Trade History *********/
// router.get('/trade_history')
// router.post('/insert_trade_history')
// router.delete('/delete_trade_history')
// router.get('/get_trade_history_details')
// router.put('/update_trade_history_details')

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
