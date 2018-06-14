// Twitter API project Client Side- Caroline Isautier
// Here I'll display modified tweets,  show the number per theme,  enable blocking, and show the number blocked
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import TweetsList from './components/TweetsList';
//import SongDetails from './components/SongDetails';
const axios = require('axios');

class App extends Component {

  state = {
    // Will be an array of objects with these keys: userName:"", index:'', userID:""
    tweets:[],
    // We'll only keep the first 2 words of each awful tweet here
    shortTweets: [],
    // Keeps track of users that have been blocked or flagged via the app
    blockedUser: [],
    // Keeps track of whether tweets were successfully loaded from Twitter API
    tweetsLoaded:false,
 
  }

  
  // This is the data this is getting:  tweets.id, .userID,  .userName, .text , .blocked
    
componentDidMount() {
  axios.get("http://localhost:8080/Tweets") 
  
      .then(response => {
         // console.log("using axios");
          console.log(response);
         let serverTweets = response.data.tweets;   
         let shortTweets=serverTweets; 
         let shortTweet="";
         for (var i=0;i<serverTweets.length; i++) {         
          console.log("Going through loop");
         // console.log(serverTweets[i]);  
          shortTweet = serverTweets[i].text.substring(0,25); 
          shortTweets[i].text = shortTweet + " ...";
         // console.log(serverTweets[i].text); 
        // console.log(shortTweets);  
         }

          console.log(shortTweets.text);  
          this.setState ({ 
            tweets:serverTweets ,
            tweetsLoaded:true,
            shortTweets: shortTweets
          }) 


      })
      .catch(error => {
         
          console.log(error);
      })    

      // Here I need a function to replace all those words 


    }

    
  tweet = React.createRef();

  // Ideally: would like a series of check boxes next to tweets that people could select and then click block users
  // Will first try with one user
  blockUser = (userName, index, userID) => {

    let blockedUser = this.state.blockedUser;
    let newblockedUser= {userName:userName, userID: userID};
    console.log( "initial blocked user ", blockedUser)
    console.log( "new blocked user ", newblockedUser)
    blockedUser.push(newblockedUser);

// hopefully I can do this twice in the app!
   /* let tweets=this.state.tweets;
    console.log( "tweets from state inblockUser function: ", tweets)
    tweets[index].blocked=true;

    console.log (" new value of blocked for tweet number ", index, ":", tweets[index].blocked)
    console.log( "new values of list of tweets from fnction:", tweets)
    console.log( "new value of blockedUser :", blockedUser)
 */
  // We post the screen name to our server
  
   axios.post('http://localhost:8080/blockedUser', {userToBlock:userName,index:index}) 

    .then(res =>{
      
      this.setState({
        //blockedUser: res.data.blockedUser ,
       
        blockedUser: [...newblockedUser, blockedUser],
      //  tweets: tweets
        tweets:res.data.tweetsForApp
       
      })  

      console.log( "tweets after the post", tweets)

   })
   
    .catch(function (error) {
      console.log(error, " error using axios post");
    });
  
    }

    showFullTweet = (id) => {


    }
    
  // since we're at the beginning of songs when the app starts, we disable the previous button
  componentWillMount() {

   /* let previousButtonStatus = 'disabled';
    this.setState({
      disabled: previousButtonStatus
      
    })
    */
  }


  render() {

   // let tweets = this.state.tweets; 
   let shortTweets = this.state.shortTweets;
   // I'm creatings vars that will change the button class and text whether its been blocked or not
   
   let blkdUserButton="btn btn-danger";
   let blkdUserButtonText="Flagged";
   let unblkdUserButton="btn btn-primary";
   let unblkdUserButtonText="Flag User";

   
    return (

      <div className="App">
        <div class="jumbotron jumbotron-fluid" id="homePageHero">
          <div class="container">

            <h1 class="display-4 homePageHeader white"> Fight Hate Speech on Twitter </h1>
            <p class="lead">  </p>
          </div>
        </div>

        <div class="row align-self-start">
          <div class="col-md-4 col-xs-12 col-sm-4">
     {this.state.tweetsLoaded?
                  
                  shortTweets.map((item,i) => {
               return (
                 <div key={i}>
               <blockquote  className="twitter-tweet" ref={this.tweet}>
                  {item.userName}   <p></p>
                 <p>{item.text}   --> Show full Tweet </p>
                 <button className={item.blocked?blkdUserButton:unblkdUserButton} name="flag" id="flag"  onClick={() => this.blockUser(item.userName, i, item.userID)}> {item.blocked?blkdUserButtonText:unblkdUserButtonText} </button>
              </blockquote>
         
          </div>
              )
            })
          
            :
      

           <h3> "Sorry, there seems to be an issue accessing Twitter. We'll try again a bit later."</h3>
         }
      
          </div>
          <div class="col-md-4 col-xs-12 col-sm-4">

        {/* 
  
            <button className="btn btn-primary" name="play" id="play" onClick={() => this.playSong2(this.state.currentSongID)}>Play </button>

            &nbsp;  <button className="btn btn-primary" name="pause" id="pause" onClick={() => this.pauseSong2(this.state.currentSongID)}>Pause </button>
            &nbsp;  <button className="btn btn-primary" name="Next" onClick={() => this.changeSong(this.state.currentSongID + 1)}>Next </button>

            &nbsp;  <button className="btn btn-primary" name="previous" disabled={this.state.disabled}
              onClick={() => this.changeSong(this.state.currentSongID - 1)}>Previous </button> &nbsp;
        */}
         
          </div>
          <div class="col-md-4 col-xs-12 col-sm-4">
          </div>

        </div>
        <div className="container">
          <p>
              {/* 
            <Route exact path="/" render={(routerProps) => (<SongsList {...routerProps} songs={songs} changeSong={this.changeSong} pauseSong2={this.pauseSong2} playSong2={this.playSong2} />)} />
            <Route path='/songDetails/:songId' render={(routerProps) => (<SongDetails {...routerProps} changeSong={this.changeSong} pauseSong2={this.pauseSong2} playSong2={this.playSong2} songs={songs} songID={this.state.currentSongID} />)} />
          */}
          </p>
        </div>
      </div>

    );
  }
}

export default App;
