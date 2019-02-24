import React, { Component } from 'react';

import LikeButton from '../../assets/outline-thumb_up-24px.svg';
import CommentButton from '../../assets/outline-comment-24px.svg';
import './DashboardPosts.css';

class DashboardPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts
    };
    this.likePost = this.likePost.bind(this);
  }

  componentDidMount() {
    this.setState({ posts: this.props.posts });
  }

  likePost(e) {
    e.preventDefault();
    console.log('liked');
  }

  render() {
    let posts = this.state.posts;
    return (
      <div id="posts">
        {posts.map(post => (
          <div className="post" key={post.text}>
            <div className="title">
              <div>
                <h1 className="name">{post.name}</h1>
                <h2 className="handle">@{post.handle}</h2>
              </div>
              <h3 className="date">{post.date.substring(0, 10)}</h3>
            </div>
            <p className="text">{post.text}</p>
            <div className="btn-row">
              <button className="like-btn" onClick={this.likePost}>
                <img src={LikeButton} alt="like button" />
              </button>
              <button className="comment-btn">
                <img src={CommentButton} alt="comment button" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DashboardPosts;
