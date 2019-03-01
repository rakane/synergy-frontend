import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import store from './store';

import Navbar from './components/layout/Navbar';
import Backdrop from './components/Backdrop/Backdrop';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import EditProfile from './components/edit-profile/EditProfile';
import CreatePost from './components/create-post/CreatePost';

import './App.css';
import { clearCurrentProfile } from './actions/profileActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode Token and get User data and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set Current User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      SideDrawerOpen: false
    };
  }

  drawerToggleClickhandler = () => {
    this.setState(prevState => {
      return { SideDrawerOpen: !prevState.SideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ SideDrawerOpen: false });
  };

  closeClickHandler = () => {
    this.setState({ SideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.SideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar drawerClickHandler={this.drawerToggleClickhandler} />
            <SideDrawer
              show={this.state.SideDrawerOpen}
              click={this.closeClickHandler}
            />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Dashboard} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/edit-profile" component={EditProfile} />
              <Route exact path="/post" component={CreatePost} />
            </div>
            {backdrop}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
