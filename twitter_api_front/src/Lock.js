import React, { Component } from 'react';

class Lock extends Component {
  showLock=()=>{
    this.props.lock.show()
  }
  render(){
    return(
      <div>
        <button className="btn btn-caroline" onClick={this.showLock}><i class="fab fa-twitter fa-lg"> </i>

  Log In to Twitter    </button>
  <p></p>
        <p>
        We in no way see your login and password.  </p>
      </div>
    )
  }
}

export default Lock;