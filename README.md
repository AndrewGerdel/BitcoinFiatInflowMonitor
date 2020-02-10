# BitcoinFiatInflowMonitor
Monitors the inflow of fiat to/from Bitcoin, across multiple exchanges.

To execute: node start.ts

This process will pull the orderbooks of both coinbase and binance.us. (Note: You'll need to change the baseUrl value in node_modules/binance-api-node/dist/http-client to point to api.binance.us instead of api.binance.com)

The values will be summed and then averaged.  The average will then be used to make a buy or sell suggestion.  It is yet to be determined if this will be helpful in my trading. Fun to write though!