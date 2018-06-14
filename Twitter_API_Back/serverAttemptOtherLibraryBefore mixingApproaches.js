// Back end of Caroline's Twitter app Assignment - Express Server in 'back-end' folder

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
//var Twitter = require('twitter');
// var Twitter = require('twitter-node-client').Twitter;

var Twitter = require('twitter-node-client').Twitter;
 
 	//Get this data from your twitter apps dashboard
var config = {

     	"consumerKey": "XXX",
     	"consumerSecret": "XXX",
     	"accessToken": "XXX",
     	"accessTokenSecret": "XXX",
     	"callBackUrl": "XXX"
 	}
 
  // var twitter = new Twitter(config);


   var twitter = new Twitter();

// loading API Key info 
require('dotenv').config();


app.listen(8080, () => {
  console.log('Server Started on http://localhost:8080');
  console.log('Press CTRL + C to stop server');
});


// let empty=true;

// Body Parser
app.use(bodyParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Callback functions
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};



var success = function (tweets) {
  console.log('Tweets [%s]', tweets);
  let numberOfTweets = tweets.statuses.length;
  console.log("Number of tweets: " + numberOfTweets)
  
  for (var i = 0; i < numberOfTweets; i++) {
    tweet = { id: tweets.statuses[i].id, userID: tweets.statuses[i].user.id, userName: tweets.statuses[i].user.name, text: tweets.statuses[i].text }
    // console.log(tweet)
    // tweets.push(tweet); 
    tweetsForApp.push(tweet);
  }
  };

  //var Twitter = require('twitter-node-client').Twitter;


  // make a directory in the root folder of your project called data
  // copy the node_modules/twitter-node-client/twitter_config file over into data/twitter_config`
  // Open `data/twitter_config` and supply your applications `consumerKey`, 'consumerSecret', 'accessToken', 'accessTokenSecret', 'callBackUrl' to the appropriate fields in your data/twitter_config file

  // var twitter = new Twitter();

  // Get 35 tweets containing the hashtag haiku

  //twitter.getSearch({'q':'#haiku','count': 35}, error, success);


  app.get('/Tweets', (req, res) => {

    let tweet = "";
    let tweetsForApp = [];
    twitter.getSearch({ 'q': '#digitalcitizenship', 'digital citizen': 35 }, error, success)
      //  outputing an array
      res.send({ tweets: tweetsForApp });

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
