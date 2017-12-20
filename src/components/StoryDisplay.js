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
    this.ref = base.syncState(`/story/${this.props.params.storyId}/content`, {
      context: this,
      state: 'story'
    });
    this.ref = base.syncState(`/story/${this.props.params.storyId}/users`, {
      context: this,
      state: 'usersLoggedIn'
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
    this.setState({
      user: null
    })
  }


  authenticate(provider) {
    console.log(`Trying to login with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout(event, user) {
    console.log(user);
    base.unauth();
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

    const timeStamp = Date.now();

    base.post(`/story/${this.props.params.storyId}/users/user-${timeStamp}`, {
        data: [ authData.user.displayName, authData.user.uid ]
      })

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
    const timeStamp = Date.now();

    story[`story-${timeStamp}`] = this.storyBody.value;
    this.setState({story});
    this.storyForm.reset();
  }

  render() {
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
        <button onClick={(e) => this.goHome(e)}>Go Home</button><br />
        <button onClick={(e) => this.logout(e, this.state.user.uid)}>Logout</button><br />

        <br /><br /><strong>Logged In:</strong>

        {
          Object
            .keys(this.state.usersLoggedIn)
            .map(key => <p key={key}>{this.state.usersLoggedIn[key][0]}</p>)
        }

      </div>
    )
  }
}

StoryDisplay.contextTypes = {
  router: React.PropTypes.object
}

export default StoryDisplay;
