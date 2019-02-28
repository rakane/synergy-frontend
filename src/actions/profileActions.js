import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_TARGET_PROFILE,
  CLEAR_TARGET_PROFILE
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('http://localhost:5000/api/users/current')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

export const getTargetProfile = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`http://localhost:5000/api/users/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_TARGET_PROFILE,
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

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const clearTargetProfile = () => {
  return {
    type: CLEAR_TARGET_PROFILE
  };
};

export const updateProfile = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/users/update', userData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push('/home');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
