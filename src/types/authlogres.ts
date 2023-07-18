import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from './store';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action interfaces
interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
  payload: string; // token
}

interface LoginFailureAction extends Action<typeof LOGIN_FAILURE> {
  payload: string; // error message
}

interface LogoutAction extends Action<typeof LOGOUT> {}

// Union type for all action types
export type AuthActionTypes = LoginSuccessAction | LoginFailureAction | LogoutAction;

// Action creators
export const loginSuccess = (token: string): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (errorMessage: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: errorMessage,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

// Reducer
const initialState = {
  user: null,
  error: '',
  successMessage: '',
};

const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        successMessage: 'Login successful',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
        successMessage: '',
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        error: '',
        successMessage: 'Logout successful',
      };
    default:
      return state;
  }
};

export default authReducer;

// Async action creator for login
export const login = (
  username: string,
  password: string
): ThunkAction<void, RootState, null, AuthActionTypes> => async (dispatch) => {
  try {
    // Make a request to your Django login endpoint using fetch or Axios
    const response = await axios.post('http://127.0.0.1:8000/login/', {
      username,
      password,
    });

    if (response.status === 200) {
      const data = response.data;
      const token = data.access;

      // Dispatch the login success action and set the token in the store
      dispatch(loginSuccess(token));
    } else {
      const errorMessage = 'Login failed';

      // Dispatch the login failure action with the error message
      dispatch(loginFailure(errorMessage));
    }
  } catch (error) {
    const errorMessage = 'An error occurred';

    // Dispatch the login failure action with the error message
    dispatch(loginFailure(errorMessage));
  }
};

// Action types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Action interfaces
interface RegisterSuccessAction extends Action<typeof REGISTER_SUCCESS> {
  payload: string; // message
}

interface RegisterFailureAction extends Action<typeof REGISTER_FAILURE> {
  payload: string; // error message
}

// Union type for all action types
export type RegisterActionTypes = RegisterSuccessAction | RegisterFailureAction;

// Action creators
export const registerSuccess = (message: string): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: message,
});

export const registerFailure = (errorMessage: string): RegisterFailureAction => ({
  type: REGISTER_FAILURE,
  payload: errorMessage,
});

// Async action creator for register
export const register = (
  username: string,
  password: string
): ThunkAction<void, RootState, null, RegisterActionTypes> => async (dispatch) => {
  try {
    // Make a request to your Django registration endpoint using fetch or Axios
    const response = await fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const message = data.message;

      // Dispatch the registration success action with the message
      dispatch(registerSuccess(message));
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.detail || 'Registration failed';

      // Dispatch the registration failure action with the error message
      dispatch(registerFailure(errorMessage));
    }
  } catch (error) {
    const errorMessage = 'An error occurred';

    // Dispatch the registration failure action with the error message
    dispatch(registerFailure(errorMessage));
  }
};
