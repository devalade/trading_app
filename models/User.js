const { hash } = require('bcryptjs');
const  {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const WithdrawModels = require('./Withdraw');
const TradeHistoryModels = require('./TradeHistory');

const attributes = {
        user_name: { type: DataTypes.STRING, defaultValue: ''},
        user_password: { type: DataTypes.STRING, defaultValue: '' },
        user_gender: { type: DataTypes.STRING, defaultValue: ''},
        user_mobile: { type: DataTypes.STRING, defaultValue: ''},
        user_email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
            isEmail: {
                args: true,
                msg: "invalid email"
            }
            },
            unique: {
            args: true,
            msg: "Email address already in use!"
            }
        },
        user_fcm_token: { type: DataTypes.STRING, defaultValue: ''},
        user_auth_token: { type: DataTypes.STRING, defaultValue: ''},
        user_profile_pic: { type: DataTypes.STRING, defaultValue: ''},
        user_country: { type: DataTypes.STRING, defaultValue: ''},
        user_city: { type: DataTypes.STRING, defaultValue: ''},
        user_postal_code: { type: DataTypes.STRING, defaultValue: ''},
        user_address: { type: DataTypes.STRING, defaultValue: ''},
        user_dob: { type: DataTypes.STRING, defaultValue: ''},
        login_type: { type: DataTypes.STRING, defaultValue: ''},
        user_type: { type: DataTypes.STRING, defaultValue: 'demo'},
        social_id: { type: DataTypes.STRING, defaultValue: ''},
        user_currency: { type: DataTypes.STRING, defaultValue: ''},
        user_wallet: { type: DataTypes.STRING, defaultValue: ''},
        user_bonus: { type: DataTypes.STRING, defaultValue: ''},
        user_role: { type: DataTypes.STRING, defaultValue: 'basic'},
        is_active: { type: DataTypes.TINYINT, defaultValue: 0},
        kycId: { type: DataTypes.INTEGER , defaultValue: 0},
        sounds: { type: DataTypes.STRING, defaultValue: 0},
        deal_result_dialog: { type: DataTypes.TIME, defaultValue: 0 }
};

const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },

        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
};
let UserModels = db.define('users', attributes, options);

// WithdrawModels.belongsTo(UserModels, {
//     foreignKey: 'user_id'
// });
// UserModels.hasMany(WithdrawModels, {
//     onDelete: 'RESTRICT'
// });
module.exports = UserModels;
