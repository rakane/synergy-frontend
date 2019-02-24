import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import './Navbar.css';
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinksLeft = (
      <div id="left-nav">
        <Link className="nav-item" to="/">
          Synergy
        </Link>
      </div>
    );
    const guestLinksRight = (
      <div id="right-nav">
        <Link className="nav-item" to="/register">
          Register
        </Link>
        <Link className="nav-item" to="/login">
          Login
        </Link>
      </div>
    );
    const authLinksLeft = (
      <div id="left-nav">
        <Link className="nav-item" to="/home">
          Home
        </Link>
        <Link className="nav-item" to="/profile">
          Profile
        </Link>
      </div>
    );
    //TODO: Profile Picture upload, make logout a tag a image
    const authLinksRight = (
      <div id="right-nav">
        <input id="search" type="text" placeholder="Search" />
        <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
          Logout
        </a>
        <Link id="nav-post-btn" className="nav-item" to="/post">
          Post
        </Link>
      </div>
    );

    return (
      <nav>
        {isAuthenticated ? authLinksLeft : guestLinksLeft}
        {isAuthenticated ? authLinksRight : guestLinksRight}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
