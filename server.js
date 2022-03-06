const express = require('express')
const app = express()
const port = process.env.PORT || 4566
const axios = require("axios").default;
require('dotenv').config()

app.set('trust proxy', true) //to get use up
app.use(express.json({type: '*/*'})); //to get json

const AUTH_STRING = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&`
const AUTH_STRINGNO = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`


app.get('/', (req, res) => {
  res.send('your ip is: ' + req.ip)
})

app.get('/getHomeEvents', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(req.ip == '::1'){ // when running on localhost
    req.ip = '75.102.104.26' //lions gate ip address as fallback
  }

  var options = {
    method: 'GET',
    url: `https://api.seatgeek.com/2/events?${AUTH_STRING}geoip=${req.ip}&q=rap&range=100mi`,
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    if(req.ip == '::1'){ // when running on localhost
      response.data.meta.geolocation = {
        postal_code: '19001'
      }
    }
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
})

app.post('/getEvents', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log('body', req.body)

  let appendParams = ''

  Object.entries(req.body).map(([key, value]) => {
    if(value != null && value != ''){
    appendParams += `&${key}=${value}`
    }
  })


  console.log('requestURL', `https://api.seatgeek.com/2/events?${AUTH_STRINGNO}${appendParams}`)

  var options = {
    method: 'GET',
    url: `https://api.seatgeek.com/2/events?${AUTH_STRINGNO}${appendParams}`,
  };

  axios.request(options).then(function (response) {
    //console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    //console.error(error);
    console.log('error')
  });
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})