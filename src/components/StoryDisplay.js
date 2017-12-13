import React from 'react';
// import base from '../base';
import StoryBody from './StoryBody';

class StoryDisplay extends React.Component {
  constructor() {
    super();
    this.goHome = this.goHome.bind(this);
    this.addToStory = this.addToStory.bind(this);

    this.state = {
      story: {}
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
    return(
      <div className="story-container">
        <h2>Story by </h2>
        {
          Object
            .keys(this.state.story)
            .map(key => <StoryBody key={key} index={key} body={this.state.story[key]} />)
          }
        <div className="story-imput">
          <form ref={(input) => this.storyForm = input} onSubmit={(e) => this.addToStory(e)}>
            <textarea ref={(input) => this.storyBody = input}></textarea><br />
            <button type="submit">Add to story</button>
          </form>
        </div>
        <button onClick={(e) => this.goHome(e)}>Go Home</button><br />
      </div>
    )
  }
}

StoryDisplay.contextTypes = {
  router: React.PropTypes.object
}

export default StoryDisplay;
