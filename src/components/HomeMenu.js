import React from 'react';

class HomeMenu extends React.Component {
  constructor() {
    super();
    this.goToNewStory = this.goToNewStory.bind(this);
    this.showStoryInput = this.showStoryInput.bind(this);
    this.goToStory = this.goToStory.bind(this);
  }
  goToNewStory(event) {
    event.preventDefault();
    console.log('Going to a New Story');
    // first grab the text from the box
    var storyId = Date.now();
    console.log(`Going to ${storyId}`)
    // second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/story/${storyId}`);
  }
  showStoryInput(event) {
    event.preventDefault();
    document.querySelector(".goto-story-input").classList.remove("hide");
  }
  goToStory(event) {
    event.preventDefault();
    var storyId = this.storyInput.value;
    console.log(`Going to ${storyId}`)
    // second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/story/${storyId}`);
  }


  render() {
    return(
      <div className="home-menu">
        <button className="btn-new-story" onClick={(e) => this.goToNewStory(e)}>Create a New Story</button><br />
        <button className="btn-join-story" onClick={(e) => this.showStoryInput(e)}>Join a Story</button>
        <form className="goto-story-input hide" onSubmit={(e) => this.goToStory(e)}>
          <input type="text" ref={(input) => { this.storyInput = input}} />
          <button type="submit">Go to there</button>
        </form>
      </div>
    )
  }
}

HomeMenu.contextTypes = {
  router: React.PropTypes.object
}

export default HomeMenu;
