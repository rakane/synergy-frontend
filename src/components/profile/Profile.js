import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getTargetProfile,
  clearTargetProfile
} from '../../actions/profileActions';
import { getProfilePosts, clearCurrentPosts } from '../../actions/postsActions';
import Spinner from '../common/Spinner';
import DashboardProfile from '../dashboard/DashboardProfile';
import DashboardPosts from '../dashboard/DashboardPosts';
import DashboardFollow from '../dashboard/DashboardFollow';
import DashboardFollowers from '../dashboard/DashboardFollowers';
import DashboardFollowing from '../dashboard/DashboardFollowing';
import axios from 'axios';

import './Profile.css';
import '../dashboard/Dashboard.css';
import '../dashboard/DashboardStats.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: [],
      authUser: {},
      centerState: 'Posts',
      width: 0,
      height: 0,
      targetHandle: this.props.match.params.id
    };
    this.handleCenterChange = this.handleCenterChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.props.clearTargetProfile();

    this.props.clearCurrentPosts();

    const handle = this.props.match.params.id;

    this.props.getTargetProfile(handle);
    this.props.getProfilePosts(handle);

    axios
      .get(`http://localhost:5000/api/users/handle/${handle}`)
      .then(user => this.setState({ following: user.following }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.state.targetHandle) {
      nextProps.clearTargetProfile();

      nextProps.clearCurrentPosts();

      const handle = nextProps.match.params.id;

      nextProps.getTargetProfile(handle);
      nextProps.getProfilePosts(handle);

      axios
        .get(`http://localhost:5000/api/users/handle/${handle}`)
        .then(user => this.setState({ following: user.following }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleCenterChange(e) {
    e.preventDefault();

    if (e.target.value === 'Following') {
      this.setState({ centerState: 'Following' });
    } else if (e.target.value === 'Followers') {
      this.setState({ centerState: 'Followers' });
    } else {
      this.setState({ centerState: 'Posts' });
    }
  }

  render() {
    let postsClass = 'stat-btn';
    let followersClass = 'stat-btn';
    let followingClass = 'stat-btn';
    const postsAction = 'Posts';
    const followersAction = 'Followers';
    const followingAction = 'Following';

    switch (this.state.centerState) {
      case 'Posts':
        postsClass = 'stat-btn active';
        break;
      case 'Followers':
        followersClass = 'stat-btn active';
        break;
      case 'Following':
        followingClass = 'stat-btn active';
        break;
      default:
        break;
    }

    const { targetProfile, loading } = this.props.profile;

    const { posts, postsLoading } = this.props.posts;

    let profileContent;

    if (targetProfile === null || loading || posts === null || postsLoading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div id="profile-container">
          {this.state.width <= 600 && (
            <div id="top-profile-container">
              <DashboardProfile
                name={targetProfile.name}
                handle={targetProfile.handle}
                bio={targetProfile.bio}
                website={targetProfile.website}
                location={targetProfile.location}
                twitter={targetProfile.twitter}
                facebook={targetProfile.facebook}
                youtube={targetProfile.youtube}
                linkedin={targetProfile.linkedin}
                instagram={targetProfile.instagram}
                followers={targetProfile.followers}
                following={targetProfile.following}
              />
            </div>
          )}
          <div id="dashboard-stats">
            <div className="spacer" />
            <div id="inner">
              <div className="top-stat">
                <button
                  className={postsClass}
                  value={postsAction}
                  onClick={this.handleCenterChange}
                >
                  <p className="stat-title">Posts</p>
                  <p className="stat-num">{posts.length}</p>
                </button>
              </div>
              <div className={'followers-stat'}>
                <button
                  className={followersClass}
                  value={followersAction}
                  onClick={this.handleCenterChange}
                >
                  <p className="stat-title">Followers</p>
                  <p className="stat-num">{targetProfile.followers.length}</p>
                </button>
              </div>
              <div className="following-stat">
                <button
                  className={followingClass}
                  value={followingAction}
                  onClick={this.handleCenterChange}
                >
                  <p className="stat-title">Following</p>
                  <p className="stat-num">{targetProfile.following.length}</p>
                </button>
              </div>
            </div>
            <div className="spacer" />
          </div>
          <div id="lower-content">
            <div id="left-col">
              {this.state.width > 600 && (
                <DashboardProfile
                  name={targetProfile.name}
                  handle={targetProfile.handle}
                  bio={targetProfile.bio}
                  website={targetProfile.website}
                  location={targetProfile.location}
                  twitter={targetProfile.twitter}
                  facebook={targetProfile.facebook}
                  youtube={targetProfile.youtube}
                  linkedin={targetProfile.linkedin}
                  instagram={targetProfile.instagram}
                  followers={targetProfile.followers}
                  following={targetProfile.following}
                />
              )}
              {this.state.width <= 950 && this.state.width > 600 && (
                <DashboardFollow
                  id="dashboard-follow"
                  following={targetProfile.following}
                  profile={targetProfile}
                />
              )}
            </div>
            <div id="center">
              {this.state.centerState === 'Posts' && (
                <DashboardPosts posts={posts} user={this.props.auth.user} />
              )}
              {this.state.centerState === 'Followers' && (
                <DashboardFollowers
                  followers={targetProfile.followers}
                  following={targetProfile.following}
                />
              )}
              {this.state.centerState === 'Following' && (
                <DashboardFollowing following={targetProfile.following} />
              )}
            </div>
            {this.state.width > 950 && (
              <DashboardFollow
                id="dashboard-follow"
                following={targetProfile.following}
                profile={targetProfile}
              />
            )}
          </div>
        </div>
      );
    }

    return <div id="profile-div">{profileContent}</div>;
  }
}

Profile.propTypes = {
  clearCurrentPosts: PropTypes.func.isRequired,
  getProfilePosts: PropTypes.func.isRequired,
  getTargetProfile: PropTypes.func.isRequired,
  clearTargetProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getTargetProfile, clearTargetProfile, getProfilePosts, clearCurrentPosts }
)(Profile);
