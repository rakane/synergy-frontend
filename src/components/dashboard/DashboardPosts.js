import React from 'react';

import LikeButton from '../../assets/outline-thumb_up-24px.svg';
import CommentButton from '../../assets/outline-comment-24px.svg';
import './DashboardPosts.css';

const DashboardPosts = ({ posts }) => {
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
            <a className="like-btn">
              <img src={LikeButton} />
            </a>
            <a className="comment-btn">
              <img src={CommentButton} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPosts;
