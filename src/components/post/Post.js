import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

import LikedButton from '../../assets/thumbs-up-filled.svg';
import LikeButton from '../../assets/thumbs-up.svg';
import CommentButton from '../../assets/outline-comment-24px.svg';

import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      handle: this.props.handle,
      text: this.props.text,
      date: this.props.date,
      id: this.props.id,
      likes: this.props.likes,
      comments: this.props.comments,
      user: this.props.user,
      alreadyLiked: false
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.likes !== undefined) {
      nextProps.likes.map(like => {
        if (like.handle === nextProps.user.handle) {
          this.setState({ alreadyLiked: true });
        }
      });
    }
  }

  handleLike(e) {
    e.preventDefault();

    const payload = {
      handle: this.state.user.handle,
      name: this.state.user.name
    };

    if (this.state.alreadyLiked) {
      axios
        .post(
          `http://localhost:5000/api/posts/unlike/${this.state.id}`,
          payload
        )
        .then(post => console.log(post))
        .catch(err => console.log(err));

      this.setState({ alreadyLiked: false });
    } else {
      axios
        .post(`http://localhost:5000/api/posts/like/${this.state.id}`, payload)
        .then(post => console.log(post))
        .catch(err => console.log(err));

      this.setState({ alreadyLiked: true });
    }
  }

  handleComment(e) {
    e.preventDefault();
  }

  render() {
    let likesCount;
    let commentsCount;

    if (this.state.likes === undefined) {
      likesCount = 0;
    } else {
      likesCount = this.state.likes.length;
    }

    if (this.state.comments === undefined) {
      commentsCount = 0;
    } else commentsCount = this.state.comments.length;

    return (
      <div className="post">
        <div className="title">
          <Link to={'/profile/' + this.state.handle}>
            <Image
              className="post-profile-photo"
              cloudName="dozvpglka"
              publicId={'profile/' + this.state.handle}
            />
          </Link>
          <div>
            <h1 className="name">{this.state.name}</h1>
            <h2 className="handle">@{this.state.handle}</h2>
          </div>
          <h3 className="date">{this.state.date.substring(0, 10)}</h3>
        </div>
        <p className="text">{this.state.text}</p>
        <div className="btn-row">
          <div className="like">
            <button className="like-btn" onClick={this.handleLike}>
              {this.state.alreadyLiked && (
                <img src={LikedButton} alt="like button" />
              )}
              {!this.state.alreadyLiked && (
                <img src={LikeButton} alt="like button" />
              )}
            </button>
            <p className="count">{likesCount}</p>
          </div>
          <div className="comment">
            <button className="comment-btn" onClick={this.handleComment}>
              <img src={CommentButton} alt="comment button" />
            </button>
            <p className="count">{commentsCount}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
