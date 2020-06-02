import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from '@demo-app/data-models';

export interface AuthData {
  loading: boolean;
  user: User;
  error: '';
}

export interface AuthState {
  readonly auth: AuthData;
}

export const initialState: AuthData = {
  loading: false,
  user: null,
  error: ''
}

export function authReducer(state = initialState, action: AuthActions): AuthData {
  switch(action.type) {
    
    case AuthActionTypes.Login:
      return { ...state, loading: true };
    
    case AuthActionTypes.LoginSuccess:
      return { ...state, loading: false, user: action.payload };
    
    case AuthActionTypes.LoginFail:
      return { ...state, loading: false, user: null };

    default: 
    return state;
  }
}
