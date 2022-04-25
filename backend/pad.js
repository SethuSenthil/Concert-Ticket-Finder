const youtube = require('scrape-youtube')

youtube.search('the weeknd concert').then((results) => {
   // Unless you specify a custom type you will only receive 'video' results
   console.log(results.videos[0]);
});