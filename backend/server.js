const express = require('express')
const app = express()
const port = process.env.PORT || 4566
const axios = require("axios").default;
const wiki = require('wikijs').default
const youtube = require('scrape-youtube')

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

app.get('/getArtistSummary/:artist', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const artist = req.params.artist
  console.log('artist', artist)

  youtube.search(artist + ' concert').then((results) => {
    // Unless you specify a custom type you will only receive 'video' results
    console.log(results.videos);
  wiki()
	.page(artist)
	.then(page => page.images())
	.then((imgres) =>{
       console.log(imgres);
       let filtered = []

       imgres.forEach(img => {
         if(!img.includes('/en/') && !img.includes('.svg')){
           filtered.push(img)
         }
       });


       wiki()
       .page(artist)
       .then(page => page.summary())
       .then((reser) =>{
           let obj = {
             artist: artist,
             summary: reser,
             images: filtered,
             video: results.videos[0],
           }
            res.send(obj)
         });
     })
    });
  });



app.listen(port, () => {
  console.log(`Server on port ${port}`)
})