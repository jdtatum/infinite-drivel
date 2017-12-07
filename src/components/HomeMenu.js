import React from 'react';

class HomeMenu extends React.Component {
  render() {
    return(
      <div className="home-menu">
        <button className="btn-new-story">Create a New Story</button><br />
        <button className="btn-join-story">Join a Story</button>
      </div>
    )
  }


}

export default HomeMenu;
