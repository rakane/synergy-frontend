import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

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
            <div className="form-group">
              <input
                type="text"
                className={classnames('form-control', {
                  'is-invalid': errors.name
                })}
                placeholder="* Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="error invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                className={classnames('form-control', {
                  'is-invalid': errors.email
                })}
                placeholder="* Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="error invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="handle"
                className={classnames('form-control', {
                  'is-invalid': errors.handle
                })}
                placeholder="* Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
              />
              {errors.handle && (
                <div className="error invalid-feedback">{errors.handle}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames('form-control', {
                  'is-invalid': errors.password
                })}
                placeholder="* Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="error invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames('form-control', {
                  'is-invalid': errors.password2
                })}
                placeholder="* Confirm Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className="error invalid-feedback">{errors.password2}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="website"
                className="form-control"
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="location"
                className="form-control"
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="bio"
                className="form-control"
                placeholder="Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="youtube"
                className="form-control"
                placeholder="Youtube"
                name="youtube"
                value={this.state.youtube}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="twitter"
                className="form-control"
                placeholder="Twitter"
                name="twitter"
                value={this.state.twitter}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="facebook"
                className="form-control"
                placeholder="Facebook"
                name="facebook"
                value={this.state.facebook}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="linkedin"
                className="form-control"
                placeholder="Linkedin"
                name="linkedin"
                value={this.state.linkedin}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="instagram"
                className="form-control"
                placeholder="Instagram"
                name="instagram"
                value={this.state.instagram}
                onChange={this.onChange}
              />
            </div>
            <input type="submit" className="submit-btn" />
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
