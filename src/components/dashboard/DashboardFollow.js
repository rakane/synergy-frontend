import React, { Component } from 'react';
import Profilecard from '../profilecard/Profilecard';

import './DashboardFollow.css';

class DashboardFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.following,
      profile: this.props.profile
    };
  }

  componentWillMount() {
    this.setState({ users: this.props.following });
    this.setState({ profile: this.props.profile });
  }

  render() {
    return (
      <div id="follow">
        <h1 id="follow-title">Who to Follow</h1>
        {this.state.users.slice(0, 3).map(user => (
          <Profilecard
            key={user._id}
            handle={user.handle}
            name={user.name}
            following={this.state.profile.following}
          />
        ))}
      </div>
    );
  }
}

export default DashboardFollow;
