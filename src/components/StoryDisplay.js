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

  logout(event, user) {
    console.log(user);
    base.remove(`/users/${user}`).then(()=> {});
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

    base.post(`/users/${authData.user.displayName}`, {
        data: {name: authData.user.displayName, uid: authData.user.uid, currentStory: `${this.props.params.storyId}`}
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
    const timestamp = Date.now();

    story[`story-${timestamp}`] = this.storyBody.value;
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
      </div>
    )
  }
}

StoryDisplay.contextTypes = {
  router: React.PropTypes.object
}

export default StoryDisplay;
