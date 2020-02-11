var binance = require('./binance');
var coinbase = require('./coinbasepro');
var summedValues = [];
const minCount = 180;

var GetRates = (async () => {
    //Get orderbook totals from binance and coinbase
    let binanceResults = await binance.GetOrderbookTotals();
    let coinbaseResults = await coinbase.GetOrderbookTotals();

    //Sum the bids and asks
    let sumBids = binanceResults.totalBidsUsd + coinbaseResults.totalBidsUsd;
    let sumAsks = binanceResults.totalAsksUsd + coinbaseResults.totalAsksUsd;

    //A negative summed value indicates there is sell pressure. Positive indicates there is buying pressure. 
    let summedValue = sumBids - sumAsks;

    //The numbers seem to bounce around a lot. So we will average the last 180 sums (30 minutes) to determine what the market is likely doing. 
    //If we don't have 30 mins worth of data, just use whatever we have. 
    summedValues.push(summedValue);
    let averageSum = await GetSumAverage();

    //Display the average. 
    let direction = averageSum > 0 ? 'Buy': 'Sell';
    console.log(`%s: Average Sum: %s (%s)`, new Date().toLocaleString(), averageSum, direction);
});

var GetSumAverage = (async () => {
    let totalAllSums = 0;
    if (summedValues.length < minCount) {
        summedValues.forEach((v) => {
            totalAllSums += v;
        });
        return (totalAllSums / summedValues.length);
    } else {
        for (let i = summedValues.length - minCount; i < summedValues.length; i++) {
            totalAllSums += summedValues[i]
        }
        return (totalAllSums / minCount);
    }
});

GetRates();
setInterval(() => {
    GetRates();
}, 10000)