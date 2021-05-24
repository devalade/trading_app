const url = 'https://min-api.cryptocompare.com/';

module.exports = {
    getClosePrice: async function () {
        try {
            const datas = await axios.get(usrl + 'data/pricemulti?fsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC&tsyms=BTC,USD,XRP,LTC,NEO,ETH,TRX,OXT,EUR,XTZ,GBP,LINK,BCH,JST,LTC');
            console.log(datas.json())
            return datas.json();
        
        } catch (error) {
            console.log(error);
        }
    }
}