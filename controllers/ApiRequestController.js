const { default: axios } = require("axios");

const url = 'https://min-api.cryptocompare.com/';

module.exports = {
    getHistoryData: async function ({fsyms, tsyms, limit}) {
        try {
            const datas = await axios.get(url + `data/generateAvg?fsym=${fsyms}&tsym=${tsyms}&limit=${limit}`);
            return datas;
        } catch (error) {
            console.log(error);
        }
    },

    historyData: async  function (req, res, next) {
        const datas = getHistoryData(req.params);
        res.json(datas);
    },

    getTradeData: async function(fsyms, tsyms) {
        try {
            const datas = await axios.get(url + `data/generateAvg?fsym=${fsyms}&tsym=${tsyms}&e=Poloniex,Kraken`);
            return datas;
        } catch (error) {
            console.log(error);
        }

    },

    tradeData: async  function (req, res, next) {
        const datas = getTradeData(req.params);
        res.json(datas);
    },

    getClosePrice: async function () {
        try {
            const datas = await axios.get(url + 'data/pricemulti?fsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC&tsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC');
            console.log(datas.json())
            return datas.json();
        
        } catch (error) {
            console.log(error);
        }
    },

    closePrice: async  function (req, res, next) {
        const datas = getClosePrice();
        res.json(datas);
    },

}
