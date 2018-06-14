import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth0Lock from 'auth0-lock';
import Lock from './Lock';

class App extends Component {
  constructor(){
    super();
    this.state = {}
  }
  componentWillMount(){
    this.lock = new Auth0Lock(
      'jSkx7qiYiiLeFUSMnLd2vvCUGIvGbAEj',
      'inclasslab2.auth0.com'
    )
    this.lock.on('authenticated', (authResult) => {
        console.log(authResult)
        this.setState({
          authToken: authResult.accessToken
        })
        this.lock.getUserInfo(authResult.accessToken, (err, user)=>{
          console.log(user)
        })
      }
    )
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {this.state.authToken ?
            <div>LOGGED IN</div>
            :
            <Lock lock={this.lock} />
          }
        </div>
      </div>
    );
  }
}

export default App;
