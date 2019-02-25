import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import DashboardProfile from './DashboardProfile';
import DashboardPosts from './DashboardPosts';
import DashboardFollow from './DashboardFollow';
import DashboardFollowers from './DashboardFollowers';
import DashboardFollowing from './DashboardFollowing';
import axios from 'axios';

import './Dashboard.css';
import './DashboardStats.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      following: [],
      centerState: 'Posts'
    };
    this.handleCenterChange = this.handleCenterChange.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();

    const { handle } = this.props.auth.user;

    axios
      .get(`http://localhost:5000/api/posts/${handle}/posts`)
      .then(posts => this.setState({ posts: posts.data.reverse() }));

    axios
      .get(`http://localhost:5000/api/users/handle/${handle}`)
      .then(user => this.setState({ following: user.following }));
  }

  handleCenterChange(type) {
    this.setState({ centerState: type });
  }

  render() {
    let postsClass = 'stat-btn';
    let followersClass = 'stat-btn';
    let followingClass = 'stat-btn';

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

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div id="dashboard-container">
          <div id="dashboard-stats">
            <div className="spacer">
              <Link className="edit-profile-btn" to="/edit-profile">
                Edit Profile
              </Link>
            </div>
            <div id="inner">
              <div className="top-stat">
                <button
                  className={postsClass}
                  onClick={() => this.handleCenterChange('Posts')}
                >
                  <p className="stat-title">Posts</p>
                  <p className="stat-num">{this.state.posts.length}</p>
                </button>
              </div>
              <div className={'followers-stat'}>
                <button
                  className={followersClass}
                  onClick={() => this.handleCenterChange('Followers')}
                >
                  <p className="stat-title">Followers</p>
                  <p className="stat-num">{profile.followers.length}</p>
                </button>
              </div>
              <div className="following-stat">
                <button
                  className={followingClass}
                  onClick={() => this.handleCenterChange('Following')}
                >
                  <p className="stat-title">Following</p>
                  <p className="stat-num">{profile.following.length}</p>
                </button>
              </div>
            </div>
            <div className="spacer" />
          </div>
          <div id="lower-content">
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
            <div id="center">
              {this.state.centerState === 'Posts' && (
                <DashboardPosts
                  posts={this.state.posts}
                  user={this.props.auth.user}
                />
              )}
              {this.state.centerState === 'Followers' && (
                <DashboardFollowers
                  followers={profile.followers}
                  following={profile.following}
                />
              )}
              {this.state.centerState === 'Following' && (
                <DashboardFollowing following={profile.following} />
              )}
            </div>
            <DashboardFollow following={profile.following} profile={profile} />
          </div>
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
