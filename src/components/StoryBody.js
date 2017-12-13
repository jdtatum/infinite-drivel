import React from 'react';

class StoryBody extends React.Component {
  render() {
    return (
      <span className="story-so-far">
        {this.props.body}&nbsp;
      </span>
    )
  }
}

export default StoryBody;
