// Back end of Caroline's Twitter app Assignment - Express Server in 'back-end' folder

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var Twitter = require('twitter');
//var hardCodedTweets = require('./tweets');


// loading API Key info 
require('dotenv').config();


app.listen(8080, () => {
  console.log('Server Started on http://localhost:8080');
  console.log('Press CTRL + C to stop server');
});

let tweetsForApp = [];

let blockedUser = [];

// We'll cycle through search terms to make sure we present different tweets if a user returns quickly to the app
let searchTerms= ["Mommy AND porn", "porn", "Teen AND porn", "MILF", "milf", "#milf", "Gay AND porn", "Black AND Porn", "hot AND videos", "cumshot", "mommy AND son", "Bitch AND porn","blowjob AND porn", "rape AND porn"]
let randomNumber= Math.floor((Math.random() * 10) + 1);
let randomSearchTerm= searchTerms[randomNumber];
//console.log("random search term :", randomSearchTerm);

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
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  callBackUrl: process.env.TWITTER_CALLBACK_URL


});



app.get('/Tweets', (req, res) => {

  client.get('search/tweets', { q: `${randomSearchTerm}`, count:100 }, function (error, tweets, response) {
    // Getting hard coded tweets from previosu searches if server is down
    if (error) {
      // Here I'd like to get tweets hard coded above instead     
      //tweetsForApp=hardCodedTweets;
     //console.log ("tweets for app if server is down: ", tweetsForApp)
          throw error;
     
    }
else {
    tweets = tweets;
    let numberOfTweets = tweets.statuses.length;
    console.log("Number of tweets: " + numberOfTweets)
   console.log(response)
    let tweet = "";
    tweetsForApp = [];
    for (var i = 0; i < numberOfTweets; i++) {
      // I'll only be using the tweet ID, user ID, screen name, and text from the tweet object
      // I'm adding a key of blocked (True or false) to manage showing a user has been blocked on the front end
      // Also adding a key to manage displaying part or all of the tweet. Set to false by default
      tweet = { id: tweets.statuses[i].id, userID: tweets.statuses[i].user.id, userName: tweets.statuses[i].user.screen_name, text: tweets.statuses[i].text, blocked: false, display: false }
      console.log("tweets are arriving")
      tweetsForApp.push(tweet);
    }
  }
    //  outputing an array
     res.send({ tweets: tweetsForApp });
   // res.send({ response });
  });
});


// only reachable by post request
// send back JSON instead of plain text


app.post('/blockedUser', (req, res) => {

  console.log(req.body)
  // 
  //   client.post('users/report_spam', {user_id:992830223673540600},  User ID doesnt work for this

  // client.post(`users/report_spam`, {user_id:req.body.user, perform_block:false},
  //  https://api.twitter.com/1.1/users/report_spam.json?screen_name=themattharris&perform_block=false
  // Try with 

  //  Working: client.post(`https://api.twitter.com/1.1/users/report_spam.json?screen_name=${req.body.user}&perform_block=false`, 
  client.post(`https://api.twitter.com/1.1/users/report_spam.json?screen_name=${req.body.userToBlock}&perform_block=false`,
    function (error, userToBlock, response) {

      if (error) {
        console.log(error);
      } else {
        // we set that user's tweets to blocked
        // console.log("tweeets for app on server side after post ", tweetsForApp)
        // tweetsForApp[req.body.index].blocked=true;
        //  console.log (tweetsForApp);
        blockedUser.push({
          userName: req.body.userToBlock,
          blocked: true

        })
      }
      // console.log(tweet);  // Tweet body.
      // console.log(response);  // Raw response object.
      console.log("blocked user contains :", blockedUser)
      console.error("is there error? ", error)

      res.send({ blockedUser: blockedUser })

    });

})




