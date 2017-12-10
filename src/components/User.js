import React from 'react';

class User extends React.Component {
  render () {
    return (
      <div className="user-info">
        <img src={this.props.userPhoto} alt={this.props.userName} className="user-photo" /><br />
        {this.props.userName}<br />
        {this.props.userEmail}
      </div>
    )
  }
}

export default User;
