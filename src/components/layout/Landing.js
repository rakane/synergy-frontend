import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Landing.css';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div id="landing">
        <div id="left">
          <h1>Synergy</h1>
        </div>
        <div id="right">
          <h2>Join Synergy Today!</h2>
          <div id="btn-row">
            <Link className="link" to="/register">
              Sign Up
            </Link>
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
