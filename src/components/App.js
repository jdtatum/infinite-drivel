import React, { Component } from 'react';
import Login from './Login';

class App extends Component {
  constructor() {
    super();

    this.renderLogin = this.renderLogin.bind(this);
    this.state = {
      uid: null
    }
  }

  renderLogin() {
    if(!this.state.uid) {
      return (
        <Login />
      )
    }
  }

  render() {
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    return (
      <div className="app">
        <h2>App</h2>
      </div>
    );
  }
}

export default App;
