const CoinbasePro = require('coinbase-pro');
const PublicClient = new CoinbasePro.PublicClient();

//Not used
var Get24HourStats = (() => {
    PublicClient.getProduct24HrStats('BTC-USD').then((data) => {
        console.log(data);
    });
});

var GetOrderbookTotals = (async () => {
    var data = await PublicClient.getProductOrderBook('BTC-USD', { level: 2 });
    let totalBidsUsd = 0;
    data.bids.forEach(bid => {
        totalBidsUsd += (parseFloat(bid[0]) * parseFloat(bid[1]));
    });

    let totalAsksUsd = 0;
    data.asks.forEach(ask => {
        totalAsksUsd += (parseFloat(ask[0]) * parseFloat(ask[1]));
    });

    return { totalAsksUsd: totalAsksUsd, totalBidsUsd: totalBidsUsd };
});


module.exports = {
    GetOrderbookTotals
}