import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitPost } from '../../actions/postsActions';
import { getCurrentProfile } from '../../actions/profileActions';
import { cloudName } from '../../config/keys';

import './CreatePost.css';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      profile: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.submitPost(this.state.text);
    this.props.history.push('/home');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== undefined && nextProps.profile.profile !== null) {
      this.setState({ profile: nextProps.profile.profile });
    } else {
      this.props.getCurrentProfile();
    }
  }

  render() {
    const { profile } = this.props.profile;

    return (
      <div id="create-post-container">
        <div id="create-post">
          {profile !== undefined && profile !== null && (
            <div id="profile-info">
              <Image
                className="quick-post-profile-image"
                cloudName={cloudName}
                publicId={'profile/' + profile.handle}
                crop="scale"
              />
              <div id="info-bar">
                <h1 id="info-bar-name">{profile.name}</h1>
                <h2 id="info-bar-handle">{profile.name}</h2>
              </div>
            </div>
          )}
          <form id="create-post-form" onSubmit={this.onSubmit}>
            <textarea
              id="create-post-input"
              value={this.state.text}
              placeholder="Tell us about your day"
              onChange={this.onChange}
            />
            <input
              id="submit"
              type="submit"
              className="create-post-submit-btn"
            />
          </form>
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  submitPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { submitPost, getCurrentProfile }
)(withRouter(CreatePost));
