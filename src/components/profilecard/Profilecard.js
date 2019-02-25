import React, { Component } from 'react';
import { Image } from 'cloudinary-react';

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

  handleFollow(e) {
    e.preventDefault();
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
          <Image
            className="profilecard-image"
            cloudName="dozvpglka"
            publicId={'profile/' + this.state.handle}
            crop="scale"
          />
          <h1 className="name">{this.state.name}</h1>
          <h2 className="handle">@{this.state.handle}</h2>
        </div>
        <div className="follow-btn-container">
          <button className="follow-btn">{buttonContent}</button>
        </div>
      </div>
    );
  }
}

export default Profilecard;
