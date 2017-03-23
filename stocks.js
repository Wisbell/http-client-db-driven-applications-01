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

  // let priceArray = stockObj.Elements[0].DataSeries.close.values

  // let { Elements: [{ DataSeries: stuff }] = stockObj
  let { Elements: [ { DataSeries: { close: { values: priceArray } } } ] } = stockObj
  // console.log("stuff", values)
  // console.log("stuff", DataSeries)

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



/*Old Way*/

// require get function from http module
// const { get } = require('http');

// const stockTicker = process.argv[2];

// // let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D`
// // let url2 = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}`
// let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"${stockTicker}","Type":"price","Params":["c"]}]}`

// get(url, (res) => {

//   let body = ''

//   res.on('data', (buff) => {

//     body += buff.toString()
//   })

//   res.on('end', () => {

//     // store body as json
//     body = JSON.parse(body)

//     // store length of values array to calculate average
//     let stockLength = body.Elements[0].DataSeries.close.values.length

//     // add up all of the stock values
//     let sumStockValues = body.Elements[0].DataSeries.close.values.reduce((acc, val) => {
//       return acc + val
//     })

//     average = ( sumStockValues / stockLength ).toFixed(2)

//     console.log(average)

//   })
// })
