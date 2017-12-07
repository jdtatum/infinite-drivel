import React, { Component } from 'react';
import base from '../base';
import User from './User'

class App extends Component {
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.state = {
      uid: null,
      userName: null,
      userEmail: null,
      userPhoto: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  authenticate(provider) {
    console.log(`Trying to login with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({
      uid: null,
      userName: null,
      userEmail: null,
      userPhoto: null
    })
  }

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }
    this.setState({
      uid: authData.user.uid,
      userName: authData.user.displayName,
      userEmail: authData.user.email,
      userPhoto: authData.user.photoURL
    });
  }

  renderLogin() {
    if(!this.state.uid) {
      return (
        <nav className="login">
          <h2>Login</h2>
          <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
        </nav>
      )
    }
  }

  render() {
    const logout = <button onClick={this.logout}>Log out!</button>;


    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    return (
      <div className="app">
        <h2>Logged In, {this.state.userName}</h2>
        <User
          userName={this.state.userName}
          userEmail={this.state.userEmail}
          userPhoto={this.state.userPhoto}
        />
        {logout}
      </div>
    );
  }
}

export default App;
