const Joi = require('joi');
const userService = require('../services/User');
const passport = require('passport');
const UserModels = require('../models/User');


// const server = require('http').Server(app)
// const io = require('socket.io')(server)


const ROLE = {
    admin: 'admin',
    basic: 'basic'
}

const LOGIN_TYPE = {
    demo: 'demo',
    real: 'real'
}

const getLogin = (req, res) => {
    res.render('auth/login')
}

const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        user_email: Joi.string().required(),
        user_password: Joi.string().required()

    });
    // validateRequest(req, next, schema);
}

const login = (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/api/login',
    failureFlash: true
    })(req, res, next);
}

const apiLogin = (req, res, next) => {
    userService.authenticate(req, res)
}

const logout = (req, res) => {
    req.logout();
}

const forgotPassword = (req, res, next) => {
    userService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}

const isDemoUser = async (req, res, next) => {
    req.user.user_type === LOGIN_TYPE.demo ? true : false;
}

const adminLogin = (req, res, next) => {
    // userService.getById(req.params.id)
    // .then(() => )
}

const getAdmin = (req, res) => {
    userService.getById(req.user.id)
        .then((user) => {
            return user.user_role == ROLE.admin ? true : false;
        }).catch(next);
}

const getRegister = (req, res) => {
    res.render('auth/register')
}

const registerSchema = (req, res, next) => {
    console.log(schema);
    const schema = Joi.object({
        user_name: Joi.string().required(),
        user_email: Joi.string().required(),
        user_password: Joi.string().required()
    });
    // validateRequest(req, next, schema);
}

const apiRegister = (req, res, next) => {
    // req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    if(req.body.user_role === 'demo'){
       userService.create(req.body)
        .then(() => {
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
            });
            res.json({ message: "We genarate a demo user" });
        })
        .catch(next);    
    }
    userService.create(req.body)
        .then(() => res.json("Register Successfull"))
        .catch(next);
}

const register = (req, res, next) => {
    // req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    userService.create(req.body)
        .then(() => res.render('auth/login'))
        .catch(next);
}

const create = (req, res, next) => {
    req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    userService.create(req.body)
        .then(() => res.redirect('/api/user'))
        .catch(next);
}

const getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.render('admin/users/index', {users}))
        .catch(next);
}

const getCurrent = (req, res, next) => {
    res.json(req.user);
}

const showById = (req, res, next) =>{
    userService.getById(req.params.id)
        .then(user => res.render('admin/users/show_user', {user}))
        .catch(next);
}

const getById = (req, res, next) =>{
    userService.getById(req.params.id)
        .then(user => res.render('admin/users/update', {user}))
        .catch(next);
}

const apiGetById = (req, res, next) =>{
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

const updateSchema = (req, res, next) => {
    const schema = Joi.object({
        user_name: Joi.string().min(4).empty(''),
        user_email: Joi.string().empty(''),
        username: Joi.string().empty(''),
        user_password: Joi.string().min(6)
    });
    //validateRequest(req, next, schema);
}

const update = (req, res, next) => {
    req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    userService.update(req.params.id, req.body)
        .then(() => res.redirect('/api/user'))
        .catch(next);
}

const apiUpdate = (req, res, next) => {
    req.body.is_active = req.body.is_active == 'on' ? 1 : 0;
    userService.update(req.params.id, req.body)
}

const _delete = (req, res, next) =>{
    userService.delete(req.params.id)
        .then(() => res.redirect('/api/user'))
        .catch(next);
}

module.exports = {
    getLogin,
    loginSchema,
    login,
    apiLogin,
    logout,
    getRegister,
    isDemoUser,
    registerSchema,
    register,
    apiRegister,
    create,
    getAll,
    getCurrent,
    getById,
    apiGetById,
    showById,
    updateSchema,
    update,
    apiUpdate,
    _delete,
    forgotPassword
}
