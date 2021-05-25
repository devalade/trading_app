const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const ejs = require('ejs');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const user = require('./services/User');
const trade_history = require('./services/TradeHistory');


//Helpers for Socket io
const { createHistory, updateHistory } = require('./helpers/tradeSystem');


//socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// Database
const db = require('./config/database');
const { default: axios } = require('axios');
const AssetsModels = require('./models/Assets');
const { sequelize } = require('sequelize');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))



//set template engine
app.set('view engine', 'ejs');



// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//CORS
app.use(cors({
  origin: "*"
}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//home route

//auth route
app.use('/api', require('./routes/index'));

app.use('/', (req, res) => {
  // if (passport.authenticate({ session: false })) {
  //   console.log("Xa marche pas");
  // }
  res.render('index')
})

// établissement de la connexion
io.on('connection', (socket) =>{
  console.log(`Connecté au client ${socket.id}`);
  // émission d'un évènement
  io.emit('news', 'Voici un nouvel élément envoyé par le serveur');
  
  socket.on('sellAction', async () => {
   
    
    let datas = {
    assetId: 1,
    investment_amount: 10,
    bid_price: 422,
      userId: 182,
      total_earning,
      trade_type,
    trade_status: 1,
    fsyms: 'BTC',
    tsyms: 'USD'
    }
//mysql://ba88b94054095b:f5d4422c@us-cdbr-east-03.cleardb.com/heroku_99b69665e2d8917?reconnect=true
     console.log("Sell action is working");
    let amount = user.OneUserInfos(datas.userId);
    amount = amount - datas.bid_price;
    await db.query(`UPDATE users SET user_wallet = ${amount}  WHERE id = ${datas.userId}`)
    
    const earningTemp = datas.total_earning;
    datas.total_earning = 0;
    

    try {
      
      const assets = await AssetsModels.findByPk(datas.assetId);
      let result = await trade_history.insertTradeHistory(datas);
      io.emit('tradeHistory', db.model('trade_history').findAll({where: {userId: datas.userId}}))

      const fsyms = assets.assest_from;
      const tsyms = assets.assest_to;

      setTimeout(async () => {
        const closePrice = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC&tsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC`);
      

        // SELL
        if (datas.trade_type === 2 ) {
          
          if (closePrice.data.assets.fsyms.tsyms > datas.bid_price) {
            console.log("Win")
            const win = await db.query(`UPDATE trade_history SET total_earning = 0 close_price = ${closePrice.data[fsyms][tsyms]} trade_status=1 WHERE id = ${datas.id}`);
          }
          else {
            console.log("Win")
            const win = await db.query(`UPDATE trade_history SET total_earning = ${earningTemp} close_price = ${closePrice.data[fsyms][tsyms]} trade_status=1 WHERE id = ${datas.id}`);
          }
        }
        else {
          

        //BUY
        if ( closePrice.data.assets.fsyms.tsyms < datas.bid_price) {
          console.log("Win")
          const win = await db.query(`UPDATE trade_history SET total_earning = 0 close_price = ${closePrice.data[fsyms][tsyms]} trade_status=1 WHERE id = ${result.id}`);
        }
        else {
          console.log("Win")
          const win = await db.query(`UPDATE trade_history SET total_earning = ${earningTemp} close_price = ${closePrice.data[fsyms][tsyms]} trade_status=1 WHERE id = ${result.id}`);
        }
      }
          
      }, 30000)
    
    } catch (error) {
      
    }
    
    io.emit('tradeHistory', db.model('trade_history').findAll({where: {userId: datas.userId}}))
  });
  

  
})
  

const PORT = process.env.PORT || 4000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));