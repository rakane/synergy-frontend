import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

import './Register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      handle: '',
      password: '',
      password2: '',
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div id="register">
        <h1>Sign Up</h1>
        <h2>Create your account!</h2>
        <div id="form-container">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              placeholder="* Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              type="email"
              placeholder="* Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              type="handle"
              placeholder="* Handle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
            />
            <TextFieldGroup
              type="password"
              placeholder="* Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              type="text"
              placeholder="* Confirm Password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
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
            />
            <TextFieldGroup
              type="twitter"
              placeholder="Twitter"
              name="twitter"
              value={this.state.twitter}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="facebook"
              placeholder="Facebook"
              name="facebook"
              value={this.state.facebook}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="linkedin"
              placeholder="Linkedin"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="instagram"
              placeholder="Instagram"
              name="instagram"
              value={this.state.instagram}
              onChange={this.onChange}
            />
            <input id="submit" type="submit" className="submit-btn" />
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
