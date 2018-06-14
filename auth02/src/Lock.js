import React, { Component } from 'react';

class Lock extends Component {
  showLock=()=>{
    this.props.lock.show()
  }
  render(){
    return(
      <div>
        <button onClick={this.showLock}>Log In</button>
      </div>
    )
  }
}

export default Lock;