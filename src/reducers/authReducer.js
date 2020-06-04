import { SET_CURRENT_USER, LOGIN_LOADING, REGISTER_LOADING, CHANGE_PW_LOADING } from "../services/types";

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loginLoading: false,
  registerLoading: false,
  changePwLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: action.loginLoading
      };
    case REGISTER_LOADING:
      return {
        ...state,
        registerLoading: action.registerLoading
      };
    case CHANGE_PW_LOADING:
      return {
        ...state,
        changePwLoading: action.changePwLoading
      };
    default:
      return state;
  }
}
