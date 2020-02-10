var binance = require('./binance');
var coinbase = require('./coinbasepro');

var GetRates = (async() => {
    let binanceResults = await binance.GetOrderbookTotals();
    let coinbaseResults = await coinbase.GetOrderbookTotals();
    let sumBids = binanceResults.totalBidsUsd + coinbaseResults.totalBidsUsd;
    let sumAsks = binanceResults.totalAsksUsd + coinbaseResults.totalAsksUsd;

    console.log(sumBids - sumAsks);
    
});

GetRates();
setInterval(() => {
    GetRates();
}, 10000 )