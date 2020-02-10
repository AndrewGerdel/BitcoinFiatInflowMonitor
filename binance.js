const Binance = require('binance-api-node').default;
var config = require('./config.json');

var client = Binance({
    apiKey: config.binanceApiKey,
    apiSecret: config.binanceApiSecret
});

var GetOrderbookTotals = (async () => {
    var data = await client.book({ symbol: 'BTCUSD' });
    let totalAsks = 0;
    data.asks.forEach((ask) => {
        totalAsks += (ask.price * ask.quantity);
    });

    let totalBids = 0;
    data.bids.forEach((bid) => {
        totalBids += (bid.price * bid.quantity);
    });

    return { totalAsksUsd: totalAsks, totalBidsUsd: totalBids };
});

module.exports = {
    GetOrderbookTotals
}
