import axios from 'axios';
import {
  POSTS_LOADING,
  GET_POSTS,
  GET_ERRORS,
  CLEAR_CURRENT_POSTS
} from './types';

export const setPostsLoading = () => dispatch => {
  return {
    type: POSTS_LOADING
  };
};

export const getHomePosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('http://localhost:5000/api/posts/current/all')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getProfilePosts = handle => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get(`http://localhost:5000/api/posts/${handle}/posts`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearCurrentPosts = () => dispatch => {
  return {
    type: CLEAR_CURRENT_POSTS
  };
};

export const submitPost = text => dispatch => {
  const payload = {
    text: text
  };

  axios
    .post('http://localhost:5000/api/posts/create-post', payload)
    .then(res => dispatch(getHomePosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
