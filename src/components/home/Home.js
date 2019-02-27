import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCurrentProfile } from '../../actions/profileActions';
import { getHomePosts, clearCurrentPosts } from '../../actions/postsActions';

import DashboardPosts from '../dashboard/DashboardPosts';
import DashboardFollow from '../dashboard/DashboardFollow';
import DashboardProfile from '../dashboard/DashboardProfile';
import Spinner from '../common/Spinner';
import QuickPost from '../quick-post/QuickPost';

import './Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      following: [],
      width: 0,
      height: 0
    };
    this.handleCenterChange = this.handleCenterChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.props.getCurrentProfile();

    this.props.clearCurrentPosts();

    this.props.getHomePosts();

    const { handle } = this.props.auth.user;

    axios
      .get(`http://localhost:5000/api/users/handle/${handle}`)
      .then(user => this.setState({ following: user.following }));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleCenterChange(type) {
    this.setState({ centerState: type });
  }

  render() {
    const { profile, loading } = this.props.profile;

    const { posts, postsLoading } = this.props.posts;

    let homeContent;

    if (
      profile === null ||
      posts === undefined ||
      posts === null ||
      loading ||
      postsLoading
    ) {
      homeContent = <Spinner />;
    } else {
      homeContent = (
        <div id="home-container">
          <div id="quick-post" />
          <div id="lower-content">
            <div id="left-col">
              {this.state.width > 600 && (
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
                  followers={profile.followers}
                  following={profile.following}
                />
              )}
              {this.state.width <= 950 && this.state.width > 600 && (
                <DashboardFollow
                  id="dashboard-follow"
                  following={profile.following}
                  profile={profile}
                />
              )}
            </div>
            <div id="home-center">
              {this.state.width > 950 && <QuickPost profile={profile} />}
              <DashboardPosts
                posts={posts.reverse()}
                user={this.props.auth.user}
              />
            </div>
            {this.state.width > 950 && (
              <DashboardFollow
                id="dashboard-follow"
                following={profile.following}
                profile={profile}
              />
            )}
          </div>
        </div>
      );
    }

    return <div id="home">{homeContent}</div>;
  }
}

Home.propTypes = {
  clearCurrentPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getHomePosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getHomePosts, clearCurrentPosts }
)(Home);
