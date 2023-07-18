export interface AuthState {
    isLoggedIn: boolean;
    error: string;
    successMessage: string;
  }
  
  export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  export const LOGIN_FAILURE = 'LOGIN_FAILURE';
  
  interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
  }
  
  interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
  }
  
  export type AuthActionTypes = LoginSuccessAction | LoginFailureAction;
  