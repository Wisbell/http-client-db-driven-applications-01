/* Write a program that performs an HTTP GET request to get the average stock price. Use the first argument for a ticker symbol. Use the get method in the http module with the API provided by MarkitOnDemand.

It would certainly be easier to test if you can grab the latest stock price, but because the response is so small, there may not be an opportunity to demonstrate chunking. On the API docs you will see an example request for data to create a chart. This will give 365 of daily prices. Use these prices to get an average.

Expected:

$ ./stocks.js AAPL
$123.45
*/


// require get function from http module
const { get } = require('http');

let url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D`
let url2 = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}`

get(url2, (res) => {

  let body = ''

  res.on('data', (buff) => {
    body += buff.toString()
  })

  res.on('end', () => {
    // store body as json
    body = JSON.parse(body)

    // console.log(body.Elements[0].DataSeries.close.values)

    let stockLength = body.Elements[0].DataSeries.close.values.length

    let sumStockValues = body.Elements[0].DataSeries.close.values.reduce((acc, val) => {
      return acc + val
    })

    average = ( sumStockValues / stockLength ).toFixed(2)

    console.log(average)

    // let elements = body.Elements
    // let dates = body.Dates

    // let count = 0;

    // console.log(dates)
    // console.log(dates.length)

    // for (let i = 0; i < dates.length; i++) {
    //   console.log(dates[i], "count", count)
    //   count++
    // }
    // let positions = JSON.parse(body.Positions)
    // console.log(positions)
  })
})
