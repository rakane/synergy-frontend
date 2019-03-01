import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  getCurrentProfile,
  followUser,
  unfollowUser
} from '../../actions/profileActions';

import './Profilecard.css';

class Profilecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: this.props.handle,
      name: this.props.name,
      following: this.props.following,
      alreadyFollowed: false
    };
    this.handleFollowClick = this.handleFollowClick.bind(this);
  }

  componentDidMount() {
    if (this.props.following !== undefined) {
      this.setState({ following: this.props.following });
      this.props.following.map(user => {
        if (user.handle === this.props.handle) {
          this.setState({ alreadyFollowed: true });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.following !== undefined) {
      nextProps.following.map(user => {
        if (user.handle === nextProps.handle) {
          this.setState({ alreadyFollowed: true });
        }
      });
    }
  }

  handleFollowClick(e) {
    const payload = {
      handle: this.state.handle,
      name: this.state.name
    };

    if (this.state.alreadyFollowed) {
      this.props.unfollowUser(payload);
      this.setState({ alreadyFollowed: false });
    } else {
      this.props.followUser(payload);
      this.setState({ alreadyFollowed: true });
    }
  }

  render() {
    const { alreadyFollowed } = this.state;
    let buttonContent = 'Follow';

    if (alreadyFollowed) {
      buttonContent = 'Following';
    }

    return (
      <div className="card-container">
        <div className="info-bar">
          <Link to={'/profile/' + this.state.handle}>
            <Image
              className="profilecard-image"
              cloudName="dozvpglka"
              publicId={'profile/' + this.state.handle}
              crop="scale"
            />
          </Link>
          <div className="title-row">
            <h1 className="name">{this.state.name}</h1>
            <h2 className="handle">@{this.state.handle}</h2>
          </div>
        </div>
        <div className="follow-btn-container">
          <button className="follow-btn" onClick={this.handleFollowClick}>
            {buttonContent}
          </button>
        </div>
      </div>
    );
  }
}

Profilecard.propTypes = {
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { followUser, unfollowUser }
)(Profilecard);
