import React, { Component } from 'react';

import './DashboardFollowing.css';
import Profilecard from '../profilecard/Profilecard';

class DashboardFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following
    };
  }
  render() {
    return (
      <div id="dashboard-followers">
        {this.state.following.map(user => (
          <Profilecard
            key={user.handle}
            handle={user.handle}
            name={user.name}
            following={this.state.following}
          />
        ))}
      </div>
    );
  }
}

export default DashboardFollowing;
