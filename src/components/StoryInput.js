import React from 'react';

class StoryInput extends React.Component {
  render() {
    return(
      <div className="story-imput">
        <form>
          <textarea></textarea><br />
          <button type="submit">Add to story</button>
        </form>
      </div>
    )
  }


}

export default StoryInput;
