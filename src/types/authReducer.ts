import { Reducer } from 'redux';
import { AuthState, AuthActionTypes, LOGIN_SUCCESS, LOGIN_FAILURE } from './authTypes';

const initialState: AuthState = {
  isLoggedIn: false,
  error: '',
  successMessage: '',
};

const authReducer: Reducer<AuthState, AuthActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        successMessage: 'Login successful',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
