import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import './SideDrawer.css';

class SideDrawer extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    let drawerClasses = 'side-drawer';

    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    let authLinks = (
      <div id="side-drawer-list">
        <Link className="side-drawer-link" to="/home">
          Home
        </Link>
        <Link className="side-drawer-link" to="/profile">
          Profile
        </Link>
        <Link className="side-drawer-link" to="/settings">
          Settings
        </Link>
        <a onClick={this.onLogoutClick.bind(this)} className="side-drawer-link">
          Logout
        </a>
      </div>
    );

    const guestLinks = (
      <div id="right-nav">
        <Link className="nav-item" to="/register">
          Register
        </Link>
        <Link className="nav-item" to="/login">
          Login
        </Link>
      </div>
    );

    return (
      <nav className={drawerClasses}>
        <span className="close thick" onClick={this.props.click} />
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

SideDrawer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(SideDrawer);
