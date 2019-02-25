import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

import LikeButton from '../../assets/outline-thumb_up-24px.svg';
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
      user: this.props.user
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  handleLike(e) {
    e.preventDefault();

    const payload = {
      handle: this.state.user.handle,
      name: this.state.user.name
    };
    axios
      .post(`http://localhost:5000/api/posts/like/${this.state.id}`, payload)
      .then(post => console.log(post))
      .catch(err => console.log(err));
  }

  handleComment(e) {
    e.preventDefault();
  }

  render() {
    let likesCount;
    let commentsCount;

    if (this.state.likes === undefined) {
      likesCount = 0;
    } else likesCount = this.state.likes.length;

    if (this.state.comments === undefined) {
      commentsCount = 0;
    } else commentsCount = this.state.comments.length;

    return (
      <div className="post">
        <div className="title">
          <Image
            className="post-profile-photo"
            cloudName="dozvpglka"
            publicId={'profile/' + this.state.handle}
          />
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
              <img src={LikeButton} alt="like button" />
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
