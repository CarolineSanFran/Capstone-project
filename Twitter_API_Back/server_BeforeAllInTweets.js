// Back end of Caroline's Twitter app Assignment - Express Server in 'back-end' folder

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var Twitter = require('twitter');

// loading API Key info 
require('dotenv').config();


app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

let tweets = [];
// let empty=true;

// Body Parser
app.use(bodyParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 
  var client = new Twitter({

    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET


  });

  console.log(client);
   
  // var params = {screen_name: 'nodejs'};
/*  client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
  res.send({tweet:tweet});
});
*/
/*
  client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    console.log(tweets);
 });
 */


app.get('/Tweets', (req,res) =>{

 client.get('search/tweets', {q: 'digital citizenship, digital citizen'}, function(error, tweets, response)  {
  if(error) throw error;
  tweets= tweets; 
    let numberOfTweets= tweets.statuses.length;
   console.log("Number of tweets: "+ numberOfTweets)

  let tweetTexts=[];
  let tweetUserID= []

    for (var i=0; i < numberOfTweets; i++) {
          tweetTexts.push(tweets.statuses[i].text);     
          console.log(tweets)
       //console.log(response);  // Raw response object.
    
    }
    
   //  outputing an array
   res.send({tweets:tweetTexts});    
    
});
});


// only reachable by post request
// send back JSON instead of plain text
/*
app.post('/blockedUser', (req,res) => {
    
      client.post('statuses/update', {status: req.body.status},  function(error, tweet, response) {
        if(error) throw error;
        console.log(tweet);  // Tweet body.
        console.log(response);  // Raw response object.
       
        blockedUser.push({
            name: req.body.name,
            price: req.body.price
          }) 
          res.json({tweet:tweet, response:response})

      });


   

  
       
})

      */


