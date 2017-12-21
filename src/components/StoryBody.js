import React from 'react';

class StoryBody extends React.Component {
  render() {
    if (this.props.body === "*****") {
      return (
        <span className="line-break">
          <hr />
        </span>
      )
    } else {
      return (
        <span id={this.props.index} className="story-so-far">
          {this.props.body}&nbsp;
        </span>
      )
    }
  }
}

export default StoryBody;
