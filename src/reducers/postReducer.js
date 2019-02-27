import {
  POSTS_LOADING,
  GET_POSTS,
  CLEAR_CURRENT_POSTS
} from '../actions/types';

const initialState = {
  posts: null,
  postsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false
      };
    case CLEAR_CURRENT_POSTS:
      return {
        postsLoading: false,
        posts: null
      };
    default:
      return state;
  }
}
