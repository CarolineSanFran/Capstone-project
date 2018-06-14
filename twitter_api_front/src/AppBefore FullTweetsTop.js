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
    tweets: [],
    // We'll only keep the first 2 words of each awful tweet here
    //shortTweets: [],
    // Keeps track of users that have been blocked or flagged via the app
    blockedUser: [],
    // Keeps track of whether tweets were successfully loaded from Twitter API
    tweetsLoaded: false,

  }


  // This is the data this is getting:  tweets.id, .userID,  .userName, .text , .blocked

  componentDidMount() {
    axios.get("http://localhost:8080/Tweets")

      .then(response => {

        console.log(response);
        let serverTweets = response.data.tweets;
        //let shortTweets=serverTweets; 
        // Add a cropped version of the tweets to the tweet object
        let shortText = "";
        for (var i = 0; i < serverTweets.length; i++) {
          console.log("Going through loop");
          // console.log(serverTweets[i]);  
          shortText = serverTweets[i].text.substring(0, 35);
          // Adding short text to my tweets list
          serverTweets[i].shortText = shortText + " ...";
          console.log(serverTweets[i].shortText);
          // console.log(shortTweets);  
        }


        this.setState({
          tweets: serverTweets,
          tweetsLoaded: true,
          //shortTweets: shortTweets
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
  // Took out parameter userID because not used on server. Replaced with index
  blockUser = (userName, index) => {



    // When without a server 
    let blockedUser = this.state.blockedUser;

    let newblockedUser = { userName: userName, index: index };
    console.log("initial blocked user ", blockedUser)
    console.log("new blocked user ", newblockedUser)
    // blockedUser.push(newblockedUser);


    // hopefully I can do this twice in the app!
    let tweets = this.state.tweets;
    console.log("tweets from state inblockUser function: ", tweets)

    // We post the screen name to our server

    axios.post('http://localhost:8080/blockedUser', { userToBlock: userName, index: index })

      .then(res => {

        console.log("sending user to block", userName, " and index :", index)

        tweets[index].blocked = true;

        console.log(" new value of blocked for tweet number ", index, ":", tweets[index].blocked)
        console.log("new values of list of tweets from fnction:", tweets)


        this.setState({

          // without server 
          // blockedUser: [...newblockedUser, blockedUser],

          // with server 
          blockedUser: res.data.blockedUser,
          tweets: tweets

        })
        // console.log( "tweets after the post", this.state.tweets)
        console.log("initial blocked user ", this.state.blockedUser)
        console.log("new blocked users after successful post  ", this.state.blockedUser)

      })

      .catch(function (error) {
        console.log(error, " error using axios post");
        console.log("blocked users after unsuccessful post  ", this.state.blockedUser)

      });

  }

  showFullTweets = () => {
    let tweets = this.state.tweets;
    tweets.display = true;
console.log("new tweets display value after show Full Tweets:", tweets.display)
    this.setState({
      tweets: tweets
    })

  }

  hideFullTweets = () => {
    let tweets = this.state.tweets;
    tweets.display = false;

    this.setState({
      tweets: tweets
    })

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

    let tweets = this.state.tweets;
    //  let shortTweets = this.state.shortTweets;
    // I'm creatings vars that will change the button class and text whether its been blocked or not

    let blkdUserButton = "btn btn-danger";
    let blkdUserButtonText = "Flagged";
    let unblkdUserButton = "btn btn-primary";
    let unblkdUserButtonText = "Flag User";


    return (

      <div className="App">
        <div className="jumbotron jumbotron-fluid" id="homePageHero" title="Fight Freely Accessible Porn on Twitter">
          <div className="container">

            <h1 className="display-4 homePageHeader white"> Fight Hate Speech on Twitter </h1>
            <p className="lead"> Po*n is freely accessible on Twitter.  It advocates not love, not sex, but violence, especially against women & teens. Here, flag those users with your Twitter account.  </p>
          </div>
        </div>

{item.display ?
 
 <div className="row align-self-start">
          <div className="col-md-4 col-xs-12 col-sm-4">
          <a onClick={() => this.hideFullTweet()}><i class="fas fa-search-minus"></i>Hide Full Tweets </a>
  : <a onClick={() => this.showFullTweet()}><i class="fas fa-search-plus"></i> Show Full Tweets </a>

          </div>
          <div className="col-md-4 col-xs-12 col-sm-4">
          </div>
          <div className="col-md-4 col-xs-12 col-sm-4">
          </div>
    </div>
    
}

        <div className="row align-self-start">
          <div className="col-md-4 col-xs-12 col-sm-4">
            {this.state.tweetsLoaded ?

              tweets.map((item, i) => {
                return (
                  <div>
                    
                  <div key={i}>
                    <blockquote className="twitter-tweet" ref={this.tweet}>
                      {item.userName}   <p></p>

                      <p>  {item.display ?
                        item.text : item.shortText}
                      </p>
                      <button className={item.blocked ? blkdUserButton : unblkdUserButton} name="flag" id="flag" onClick={() => this.blockUser(item.userName, i)}><i className="icon-thumbs-down"> </i>{item.blocked ? blkdUserButtonText : unblkdUserButtonText} </button>
                    </blockquote>

                  </div>
                  </div>
              )
              })

              :


              <h3> "Sorry, there seems to be an issue accessing Twitter. We'll try again a bit later."</h3>
            }

          </div>
          <div className="col-md-4 col-xs-12 col-sm-4">

            {/* 
  
            <button className="btn btn-primary" name="play" id="play" onClick={() => this.playSong2(this.state.currentSongID)}>Play </button>

            &nbsp;  <button className="btn btn-primary" name="pause" id="pause" onClick={() => this.pauseSong2(this.state.currentSongID)}>Pause </button>
            &nbsp;  <button className="btn btn-primary" name="Next" onClick={() => this.changeSong(this.state.currentSongID + 1)}>Next </button>

            &nbsp;  <button className="btn btn-primary" name="previous" disabled={this.state.disabled}
              onClick={() => this.changeSong(this.state.currentSongID - 1)}>Previous </button> &nbsp;
        */}

          </div>
          <div className="col-md-4 col-xs-12 col-sm-4">
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
