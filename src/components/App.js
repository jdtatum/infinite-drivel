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
    this.setState({ user: null });
    base.unauth();
    window.location.reload();
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
    if(!this.state.user.uid) {
      return (
        <nav className="login">
          <h2>Login</h2>
          <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
          <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
        </nav>
      )
    }
  }

  render() {

    if(!this.state.user.uid) {
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
        <HomeMenu
          story={this.state.story}
          user={this.state.user}
        />
        <button onClick={this.logout}>Log out</button>
      </div>
    );
  }
}

export default App;
