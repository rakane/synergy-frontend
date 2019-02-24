import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import DashboardProfile from './DashboardProfile';
import DashboardPosts from './DashboardPosts';
import DashboardFollow from './DashboardFollow';
import axios from 'axios';

import './Dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();

    const { handle } = this.props.auth.user;

    axios
      .get(`http://localhost:5000/api/posts/${handle}/posts`)
      .then(posts => this.setState({ posts: posts.data }));
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div id="dashboard-container">
          <DashboardProfile
            name={profile.name}
            handle={profile.handle}
            bio={profile.bio}
            website={profile.website}
            location={profile.location}
            twitter={profile.twitter}
            facebook={profile.facebook}
            youtube={profile.youtube}
            linkedin={profile.linkedin}
            instagram={profile.instagram}
          />
          <DashboardPosts posts={this.state.posts} />
          <DashboardFollow />
        </div>
      );
    }

    return <div id="dashboard">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
