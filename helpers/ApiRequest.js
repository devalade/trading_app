const { default: axios } = require("axios");

const url = 'https://min-api.cryptocompare.com/';

module.exports = {
    getHistoryData: async function (fsyms, tsyms, limit) {
        try {
            const datas = await axios.get(url + `data/generateAvg?fsym=${fsyms}&tsym=${tsyms}&limit=${limit}`);
            return datas;
        } catch (error) {
            console.log(error);
        }
    },

    getTradeData: async function(fsyms, tsyms) {
        try {
            const datas = await axios.get(url + `data/generateAvg?fsym=${fsyms}&tsym=${tsyms}&e=Poloniex,Kraken`);
            return datas;
        } catch (error) {
            console.log(error);
        }

    },

    getClosePrice: async function () {
        try {
            const datas = await axios.get(url + 'data/pricemulti?fsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC&tsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC');
            console.log(datas.json())
            return datas.json();
        
        } catch (error) {
            console.log(error);
        }
    }

}