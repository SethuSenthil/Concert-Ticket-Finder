const express = require('express')
const app = express()
const port = 4566
const axios = require("axios").default;
require('dotenv').config()

const AUTH_STRING = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&`

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getHomeEvents', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var options = {
    method: 'GET',
    url: `https://api.seatgeek.com/2/events?${AUTH_STRING}postal_code=${'19001'}&q=rap`,
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})