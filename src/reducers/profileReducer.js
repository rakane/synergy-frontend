import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_TARGET_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  targetProfile: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_TARGET_PROFILE:
      return {
        ...state,
        targetProfile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
