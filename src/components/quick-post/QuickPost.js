import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitPost } from '../../actions/postsActions';
import { cloudName } from '../../config/keys';

import './QuickPost.css';

class QuickPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      text: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== undefined) {
      this.setState({ profile: nextProps.profile });
    }
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.submitPost(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    const { profile } = this.props.profile;

    let style = {};

    if (this.state.text.length > 0) {
      style = { height: '100px' };
    }

    return (
      <div id="quick-post-container">
        {profile !== undefined && profile !== null && (
          <Image
            className="quick-post-profile-image"
            cloudName={cloudName}
            publicId={'profile/' + profile.handle}
            crop="scale"
          />
        )}
        <form id="quick-post-form" onSubmit={this.onSubmit}>
          <textarea
            id="quick-post-input"
            value={this.state.text}
            placeholder="Tell us about your day"
            onChange={this.onChange}
            style={style}
          />
          {this.state.text.length > 0 && (
            <input
              id="submit"
              type="submit"
              className="quick-post-submit-btn"
            />
          )}
        </form>
      </div>
    );
  }
}

QuickPost.propTypes = {
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
  { submitPost }
)(QuickPost);
