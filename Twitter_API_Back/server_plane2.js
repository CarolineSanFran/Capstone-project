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

let tweetsForApp = [];

let blockedUser= [];

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

  // Added during plane
  let tweets = 
  {statuses:

    [{id:1005173652432785400,userID:1163472235,userName:"BellflowerHardy",text:"RT @MikeLynchMentor: \"Being a good digital citizen is more than knowing your way around the web. It's about connecting and collaborating in…",blocked:false},{id:1005172747079540700,userID:998361521041244200,userName:"Carolin66345489",text:"As students become more fluent with technology, the need to learn how to become a good digital citizen becomes more… https://t.co/SUXp1xajW0",blocked:false},{id:1005163259035574300,userID:1003991796274421800,userName:"ltholmes13",text:"RT @russell1955: Here's the first tutorial on a new series on #digital #citizenship ideas following a successful workshop with teenagers in…",blocked:false},{id:1005156940878696400,userID:812151600,userName:"MikeLynchMentor",text:"\"Being a good digital citizen is more than knowing your way around the web. It's about connecting and collaborating… https://t.co/vEg080aQfw",blocked:false},
    {id:1005155759670353900,userID:853571216,userName:"pertslab",text:"This school provides strategies for parents on social emotional learning and digital citizenship… https://t.co/wCMnv8E7zZ",blocked:false},{id:1005151692646748200,userID:118945026,userName:"NessaV_32",text:"@MedCit Cohort, check out @OPSMrsKorf for digital citizenship and other important #edtech info\n#CI501 https://t.co/7qMYWahwS8",blocked:false},{id:1005149424123670500,userID:58142152,userName:"CMcKee27",text:"RT @MicrosoftEDU: The use of technology and the internet has become a way of life for many students today. Share the important lessons of d…",blocked:false},{id:1005147527333720000,userID:2790662564,userName:"afterschoolapp",text:"From the After School Blog: Teaching SEL &amp; Digital Citizenship: 6 Takeaways from Live Twitter Chat… https://t.co/WhxzY0kTIz",blocked:false},{id:1005142652382216200,userID:865012838,userName:"salvamontaner",text:"Teaching Digital Citizenship-Idea 1# Copyright https://t.co/2pNp6rHgOR vía @YouTube",blocked:false},{id:1005137355559166000,userID:32928912,userName:"Dawn22176",text:"RT @DaringEnglish: Help students understand digital citizenship and proper online use with this digital citizenship min https://t.co/xiJP32…",blocked:false},{id:1005133178951041000,userID:4860111327,userName:"SangermanoMina",text:"RT @LemarrTreadwell: Microsoft Three Pillars of Digital Citizenship.\n\n#CVTechTalk https://t.co/bNiZkoIcFx",blocked:false},{id:1005130996616921100,userID:1003605894154932200,userName:"FertigStacia",text:"Google class is coming to a close.  Learned about a great Digital Citizenship curriculum \"Be Internet Awesome\" to u… https://t.co/4KmsKZWFJS",blocked:false},{id:1005130224630140900,userID:866377482060136400,userName:"AnnStavro",text:"RT @MicrosoftEDU: The use of technology and the internet has become a way of life for many students today. Share the important lessons of d…",blocked:false},{id:1005129846777892900,userID:351715792,userName:"MarkElgart",text:"The 3 main things kids should learn to be digitally safe, social and savvy. @digcitizen #digcit #edtech… https://t.co/2wMXdlh0p5",blocked:false},{id:1005128611031126000,userID:2235094260,userName:"SmartSocialKids",text:"Teach your students how to become good digital citizens: https://t.co/OYDqDlIrPA https://t.co/j5sFhuuuMY",blocked:false}]};

console.log("tweet 0 ID", tweets.statuses[0]);

app.get('/Tweets', (req,res) =>{

    // removed during place
 /*client.get('search/tweets', {q: 'digital citizenship', 'provence':20}, function(error, tweets, response)  {
  if(error) throw error;

  tweets= tweets;  */
  let numberOfTweets= tweets.statuses.length;
  console.log("Number of tweets: "+ numberOfTweets)
  // console.log("full tweet", tweets)
  let tweet="";
  tweetsForApp=[];
  for (var i=0; i < numberOfTweets; i++) {
    // I'll only be using the tweet ID, user ID, screen name, and text from the tweet object
    // I'm adding a key of blocked (True or false) to manage showing a user has been blocked on the front end
   
    /* Before plane version
    tweet= {id:tweets.statuses[i].id, userID:tweets.statuses[i].user.id, 
        userName:tweets.statuses[i].user.screen_name,text: tweets.statuses[i].text,blocked:false}
        */

       tweet= {id:tweets.statuses[i].id, userID:tweets.statuses[i].userId, 
        userName:tweets.statuses[i].userName,text: tweets.statuses[i].text,blocked:false}
   
      console.log("tweets are arriving")
    tweetsForApp.push(tweet);    
    
  }
 
   //  outputing an array
   res.send({tweets:tweetsForApp});    
    
});
// plane removal });


// only reachable by post request
// send back JSON instead of plain text
app.post('/blockedUser', (req,res) => {
    
console.log(req.body)

   //   client.post('users/report_spam', {user_id:992830223673540600},  User ID doesnt work for this
  // client.post(`users/report_spam`, {user_id:req.body.user, perform_block:false},
 //  https://api.twitter.com/1.1/users/report_spam.json?screen_name=themattharris&perform_block=false
 // Try with 

 //  Working: client.post(`https://api.twitter.com/1.1/users/report_spam.json?screen_name=${req.body.user}&perform_block=false`, 
   client.post(`https://api.twitter.com/1.1/users/report_spam.json?screen_name=${req.body.userToBlock}&perform_block=false`, 
   function(error, userToBlock, response) {
  
         if(error) {          
          console.log(error);
          } else {
           // we set that user's tweets to blocked
           tweetsForApp[req.body.index].blocked=true;
            console.log (tweetsForApp);
            blockedUser.push({
              userName: req.body.userToBlock,
              blocked:true
           
            }) 
          }
       // console.log(tweet);  // Tweet body.
        // console.log(response);  // Raw response object.
        console.log(blockedUser)
        console.error(error)
       
        res.send({blockedUser:blockedUser, tweets:tweetsForApp})

        console.error("tweets after post in server", tweets)
       
      });
      
})

    


