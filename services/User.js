const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../config/send-email');
const db = require('../config/database');
const Op = db.Sequelize.Op;
const UserModels = require('../models/User');
const WithdrawModels = require('../models/Withdraw');
const TradeHistoryModels = require('../models/TradeHistory');
const AssetsModels = require('../models/Assets');

WithdrawModels.belongsTo(UserModels, {
    foreignKey: 'userId'
})

UserModels.hasMany(WithdrawModels);

TradeHistoryModels.belongsTo(UserModels, {
    foreignKey: 'userId'
});

UserModels.hasMany(TradeHistoryModels);

// (async function UsersAllInfos (id) {
//     let data = await UserModels.findOne({
//         where: {id: id},
//         include: [WithdrawModels, TradeHistoryModels]
//     });
//     console.log(data);
    
// })()

// console.log(UserModels.findAll( {include: ['withdraw'] }))

module.exports = {
    authenticate,
    UsersAllInfos,
    OneUserInfos,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getUserByEmail,
    findById: UserModels.findByPk,
    findOne: UserModels.findOne,
    sendPasswordResetEmail,
    forgotPassword
};

// const handleErrors = (err) => {
//   console.log(err.message, err.code);
//   let errors = { email: '', password: '' };

//   // duplicate email error
//   if (err.code === 11000) {
//     errors.email = 'that email is already registered';
//     return errors;
//   }

//   // validation errors
//   if (err.message.includes('user validation failed')) {
//     // console.log(err);
//     Object.values(err.errors).forEach(({ properties }) => {
//       // console.log(val);
//       // console.log(properties);
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// }

async function UsersAllInfos () {
    return await UserModels.findAll({
        include: [WithdrawModels, TradeHistoryModels]
    });
    
}

async function OneUserInfos (id) {
    return await UserModels.findOne({
        where: {id: id},
        include: [WithdrawModels, TradeHistoryModels]
    });
    
}

async function authenticate(req, res, next) {
  console.log(req.body);
     const { user_email, user_password } = req.body;
    //  console.log(req.body);

  if (!user_email || !user_password) {
    return res.status(400).json({error: "Email or password is missing"});
  }

  try {
    const dbUser = await UserModels.findOne({ where: { user_email } });
    let correctCredentials = await bcrypt.compare(user_password, dbUser.user_password);

    if (correctCredentials) {
    //   if (dbUser.role === "user") {
    //     throw new Error("User is not authorized to login");
    //   }
      const maxAge = Math.floor(Date.now() / 1000) + 60 * 60;
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          id: dbUser.id,
          email: dbUser.user_email,
          name: dbUser.user_name
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
      return res.json({ user: dbUser.id, message: "Welcome back! "});
    }

    throw new Error("invalid password");
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ error: "Wrong email or password entered" });
  }
};

// async function authenticate({ user_email, user_password }) {
//     const user = await UserModels.scope('withHash').findOne({ where: { user_email } });

//     if (!user || !(await bcrypt.compare(user_password, user.user_password)))
//         throw 'Username or password is incorrect';

//     // authentication successful
//     const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
//     return { ...user.get(), token };
// }

async function getAll() {
    return await UserModels.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    //console.log(UserModels.findAll())
     
    if (params.login_type != 'demo') {
    
        if ( await UserModels.findOne({ where: { user_email: params.user_email } })) {              return res.status(400).json({ error: "That email is already register" });
        }

        // hash password
      if (params.user_password !== undefined) {
        if (params.user_password < 8) {
            return res.status(400).json({ error: "minimum password length is 8 characters" });
          }
            params.user_password =  await bcrypt.hash(params.user_password, 10);
            
        }
    }

    // save user
    await  UserModels.create(params);
}

async function update(id, params) {

  UserModels.update(params, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
    
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

//get User by email
//get User by email
async function getUserByEmail(credentials ) {
    const user = await UserModels.findOne({where: { credentials }});
    if (!user) throw 'User not found';
    return user;
}

// helper functions

async function getUser(id) {
    const user = await UserModels.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

async function forgotPassword({ user_email }, origin) {
    const user = await UserModels.findOne({ where: { user_email } });

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 24 hours
    user.resetToken = randomTokenString();
    user.resetTokenExpires = new Date(Date.now() + 24*60*60*1000);
    await user.save();

    // send email
    await sendPasswordResetEmail(account, origin);
}

async function sendPasswordResetEmail(user, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/account/reset-password?token=${account.resetToken}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Sign-up Verification API - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}