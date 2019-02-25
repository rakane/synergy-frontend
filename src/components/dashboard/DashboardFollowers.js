import React, { Component } from 'react';

import './DashboardFollowers.css';
import '../profilecard/Profilecard';
import Profilecard from '../profilecard/Profilecard';

class DashboardFollowers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: this.props.followers,
      following: this.props.following
    };
  }
  componentWillMount() {
    this.setState({ following: this.props.following });
    this.setState({ followers: this.props.followers });
  }

  render() {
    return (
      <div id="dashboard-followers">
        {this.state.followers.map(user => (
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

export default DashboardFollowers;
