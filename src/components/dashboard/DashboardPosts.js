import React, { Component } from 'react';
import Post from '../post/Post';

import './DashboardPosts.css';

class DashboardPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
      user: this.props.user
    };
  }

  componentDidMount() {
    this.setState({ posts: this.props.posts });
    this.setState({ user: this.props.user });
  }

  render() {
    let posts = this.state.posts;
    return (
      <div id="posts">
        {posts.map(post => (
          <Post
            key={post._id}
            name={post.user.name}
            handle={post.user.handle}
            text={post.text}
            date={post.date}
            id={post._id}
            likes={post.likes}
            comments={post.comments}
            user={this.state.user}
          />
        ))}
      </div>
    );
  }
}

export default DashboardPosts;
