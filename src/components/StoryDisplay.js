import React from 'react';
import StoryInput from './StoryInput';

class StoryDisplay extends React.Component {
  constructor() {
    super();
    this.goHome = this.goHome.bind(this);
  }
  goHome() {
    this.context.router.transitionTo(`/`);
  }
  render() {
    return(
      <div className="story-container">
        <h2>Story</h2>
        <StoryInput />
        <button onClick={(e) => this.goHome(e)}>Go Home</button>
      </div>
    )
  }
}

StoryDisplay.contextTypes = {
  router: React.PropTypes.object
}

export default StoryDisplay;
