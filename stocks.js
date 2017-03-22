#!/usr/bin/env node

/* Write a program that performs an HTTP GET request to get the average stock price. Use the first argument for a ticker symbol. Use the get method in the http module with the API provided by MarkitOnDemand.

It would certainly be easier to test if you can grab the latest stock price, but because the response is so small, there may not be an opportunity to demonstrate chunking. On the API docs you will see an example request for data to create a chart. This will give 365 of daily prices. Use these prices to get an average.

Expected:

$ ./stocks.js AAPL
$123.45
*/


// require get function from http module
const { get } = require('http');

const stockTicker = process.argv[2];

// store the stockTicker in the url
let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"${stockTicker}","Type":"price","Params":["c"]}]}`

const getJSON = (url) => {
  return new Promise((resolve, reject) => {
    get(url, (res) => {

      let body = ''

      res.on('data', (buff) => {

        body += buff.toString()
      })

      res.on('end', () => {

        // store body as json
        // return body = JSON.parse(body)
        resolve(body = JSON.parse(body))
      })
    })
  }) // close promise
}

const calcAverage = (stockObj) => {

  let priceArray = stockObj.Elements[0].DataSeries.close.values

  // store array length
  let stockLength = priceArray.length

  // add up all of the stock values
  let sumStockValues = priceArray.reduce((acc, val) => {
    return acc + val
  })

  average = ( sumStockValues / stockLength ).toFixed(2)

  return average
}


// run the functions

getJSON(url)
.then( (data) => {
  console.log(calcAverage(data))
})
