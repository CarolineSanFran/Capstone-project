// Back end of Caroline's Twitter app Assignment - Express Server in 'back-end' folder

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var Twitter = require('twitter');


app.listen(8000, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});


// Body Parser
app.use(bodyParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  let tweets = 
  {statuses:
  [{created_at:"Mon Jun 04 18:45:09 +0000 2018",
  id:1003709258171445249,
  id_str:"1003709258171445249",
  text:"More evidence that I am living the dream. I somehow got to design and teach this amazing new Digital Citizenship co\\u2026 "},

  {created_at:"Mon Jun 04 18:23:42 +0000 2018", id:1003703860378996737,id_str:"1003703860378996737",text:"What is Digital Citizenship? https:\\/\\/t.co\\/GKLczm7CSk via @ONEforTraining","truncated":false},
  
  {created_at:"Mon Jun 04 18:12:49 +0000 2018", id:1003701121003634688,id_str:"1003701121003634688",text:"RT @danvkoch: Join us tonight at 10PM EST in preparation for @st4tevent - and chat with the #edtechafterdark community about how we need to\\u2026","truncated":false},
  
  {created_at:"Mon Jun 04 18:10:39 +0000 2018", id:1003700573261258755,id_str:"1003700573261258755",text:"RT @Robomatter: Check out @LAColangelo\'s blog about the importance of digital citizenship education!\\n\\nhttps:\\/\\/t.co\\/qZwqFmzEgS\\n\\n#STEM #CSfor\\u2026","truncated":false} ]
  }
  


app.get('/Tweets', (req,res) =>{

    // Old version with a string, now with an array of texts
   // let tweetsText="";
   let tweetTexts=[];

    let numberOfTweets= tweets.statuses.length;
     console.log("Number of tweets: "+ numberOfTweets)

   //  console.log("tweet 3: "+ tweets.statuses[2].text)

      for (var i=0; i < numberOfTweets; i++) {
        
            tweetTexts.push(tweets.statuses[i].text); 
          
          //   resultsList.push(movies[movieIndex]);
         
          // tweetsText=  tweetsText + tweets.statuses[i].text + '\n'  ;
         
            console.log(tweets)
        //console.log(response);  // Raw response object.
      
      }
      // Old version outputting a string 
     // res.send({tweets:tweetsText});   
     // N<ew version outputing an array
     res.send({tweets:tweetTexts});    
      
});

