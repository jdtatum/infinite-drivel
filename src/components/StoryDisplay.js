import React from 'react';
import base from '../base';
import { nameSplit } from '../helpers';
import StoryBody from './StoryBody';

class StoryDisplay extends React.Component {
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.goHome = this.goHome.bind(this);
    this.addToStory = this.addToStory.bind(this);
  }

  state = {
    user: {},
    story: {},
    usersLoggedIn: {}
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`/story/${this.props.params.storyId}`, {
      context: this,
      state: 'story'
    });
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
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

    const usersLoggedIn = {...this.state.usersLoggedIn};
    const userCount = Object.keys(usersLoggedIn).length + 1;

    usersLoggedIn[`user-${userCount}`] = {name: authData.user.displayName, uid: authData.user.uid};
    this.setState({
      user: {...authData.user},
      usersLoggedIn: {...usersLoggedIn}
    });
    

  }

  renderLogin() {
    if(!this.state.uid) {
      return (
        <nav className="login">
          <h2>Login</h2>
          <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
          <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
        </nav>
      )
    }
  }

  goHome() {
    this.context.router.transitionTo(`/`);
  }

  addToStory(e) {
    e.preventDefault();
    console.log(this.storyBody.value);
    const story = {...this.state.story}
    const lineCount = Object.keys(this.state.story).length + 1;
    story[`story-${lineCount}`] = this.storyBody.value;
    this.setState({story});
    this.storyForm.reset();
  }

  render() {
    console.log(this.state.user);
    if(!this.state.user.displayName) {
      return <div>{this.renderLogin()}</div>
    }

    return(
      <div className="story-container">
        <h2>Story by {nameSplit(this.state.user.displayName)}</h2>
        {
          Object
            .keys(this.state.story)
            .map(key => <StoryBody key={key} index={key} body={this.state.story[key]} />)
          }
        <div className="story-input">
          <form ref={(input) => this.storyForm = input} onSubmit={(e) => this.addToStory(e)}>
            <textarea ref={(input) => this.storyBody = input}></textarea><br />
            <button type="submit">Add to story</button>
          </form>
        </div>

          {
            Object
              .keys(this.state.usersLoggedIn)
              .map(key => <p key={key}>{this.state.usersLoggedIn[key].name}</p>)
          }

        <button onClick={(e) => this.goHome(e)}>Go Home</button><br />
      </div>
    )
  }
}

StoryDisplay.contextTypes = {
  router: React.PropTypes.object
}

export default StoryDisplay;
