const CoinbasePro = require('coinbase-pro');
const PublicClient = new CoinbasePro.PublicClient();

//Not used
var Get24HourStats = (() => {
    PublicClient.getProduct24HrStats('BTC-USD').then((data) => {
        console.log(data);
    });
});

var GetOrderbookTotals = (() => {
    PublicClient.getProductOrderBook('BTC-USD', { level: 2 }).then((data) => {
        let totalBidsUsd = 0;
        data.bids.forEach(bid => {
            totalBidsUsd += (parseFloat(bid[0]) * parseFloat(bid[1]));
        });
        console.log(totalBidsUsd);

        let totalAsksUsd = 0;
        data.asks.forEach(ask => {
            totalAsksUsd += (parseFloat(ask[0]) * parseFloat(ask[1]));
        });
        console.log(totalAsksUsd);

        return { totalAsksUsd: totalAsksUsd, totalBidsUsd: totalBidsUsd };
    });
});


module.exports = {
    GetOrderbookTotals
}