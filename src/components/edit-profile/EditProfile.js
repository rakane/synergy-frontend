import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from '../../actions/profileActions';

import backArrowArt from '../../assets/backarrow.svg';
import './EditProfile.css';

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      website: '',
      location: '',
      bio: '',
      youtube: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentProfile();

    if (this.props.profile !== undefined) {
      const { profile } = this.props.profile;
      if (profile !== null) {
        this.setState({ website: profile.website });
        this.setState({ location: profile.location });
        this.setState({ bio: profile.bio });
        this.setState({ youtube: profile.youtube });
        this.setState({ twitter: profile.twitter });
        this.setState({ facebook: profile.facebook });
        this.setState({ linkedin: profile.linkedin });
        this.setState({ instagram: profile.instagram });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const { profile } = nextProps.profile;

    if (profile !== null) {
      this.setState({ website: profile.website });
      this.setState({ location: profile.location });
      this.setState({ bio: profile.bio });
      this.setState({ youtube: profile.youtube });
      this.setState({ twitter: profile.twitter });
      this.setState({ facebook: profile.facebook });
      this.setState({ linkedin: profile.linkedin });
      this.setState({ instagram: profile.instagram });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateUser = {
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };
    this.props.updateProfile(updateUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const { profile } = this.props.profile;

    return (
      <div id="edit-profile">
        <Link id="back-arrow-link" to="/profile">
          <img id="back-arrow" src={backArrowArt} alt="back arrow" />
        </Link>
        <h1>Edit your profile!</h1>
        <form id="edit-profile-form">
          <TextFieldGroup
            type="website"
            placeholder="Website"
            name="website"
            value={this.state.website}
            onChange={this.onChange}
          />
          <TextFieldGroup
            type="location"
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            info="City, State"
          />
          <TextFieldGroup
            placeholder="Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
          />
          <TextFieldGroup
            type="youtube"
            placeholder="Youtube"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            info="username only"
          />
          <TextFieldGroup
            type="twitter"
            placeholder="Twitter"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            info="username only"
          />
          <TextFieldGroup
            type="facebook"
            placeholder="Facebook"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            info="username only"
          />
          <TextFieldGroup
            type="linkedin"
            placeholder="Linkedin"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            info="username only"
          />
          <TextFieldGroup
            type="instagram"
            placeholder="Instagram"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            info="username only"
          />
          <input id="submit" type="submit" className="submit-btn" />
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { updateProfile, getCurrentProfile }
)(withRouter(EditProfile));
