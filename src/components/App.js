import React, { Component } from 'react';
import base from '../base';
import User from './User';
import HomeMenu from './HomeMenu'

class App extends Component {
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }

  state = {
    user: {}
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
      user: null
    })
  }

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }
    this.setState({
      user: {...authData.user}
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
    const logout = <button onClick={this.logout}>Log out</button>;

    if(!this.state.user) {
      return <div>{this.renderLogin()}</div>
    }
    return (
      <div className="app">
        <h2>Welcome to Infinite Drivel</h2>
        <User
          userName={this.state.user.displayName}
          userEmail={this.state.user.email}
          userPhoto={this.state.user.photoURL}
        />
        <HomeMenu />
        {logout}
      </div>
    );
  }
}

export default App;
