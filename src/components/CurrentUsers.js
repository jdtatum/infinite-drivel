import React, { Component } from 'react';
// import base from '../base';

class CurrentUsers extends Component {
  constructor() {
    super();
    this.renderUsers = this.renderUsers.bind(this);
  }

  renderUsers(key) {
    const user = this.props.users[key];

    if (this.props.self.uid === user.uid ) {
      return(
        <div className="current-user" key={key}>
          {user.name} <button onClick={() => this.props.logout(key)}>Logout</button>
        </div>
      )
    } else {
      return(
        <div className="current-user" key={key}>
          {user.name}
        </div>
      )
    }
  }

  render() {
    return(
      <div className="current-users">
        <br /><br /><strong>Logged In:</strong>

        {
          Object
            .keys(this.props.users)
            .map(this.renderUsers)
        }

      </div>
    )
  }
}

export default CurrentUsers;
