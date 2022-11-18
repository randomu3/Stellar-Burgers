import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  CHECK_TOKEN,
  LOADING_TRUE,
  REFRESH_TOKEN,
  TAuthActions,
  TUser,
} from "../actions/auth";

export interface IAuthState {
  accessToken: string;
  isAuthorized: boolean;
  user: null | TUser
  isLoading: boolean;
}

const initialState: IAuthState = {
  accessToken: "",
  isAuthorized: false,
  user: null,
  isLoading: true,
};

export const authReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case REFRESH_TOKEN:
      return {
        ...state,
        isAuthorized: true,
        accessToken: action.accessToken,
      };
    case LOADING_TRUE:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthorized: true,
        user: action.data.user,
      };
    case CHECK_TOKEN:
      return {
        ...state,
        user: action.data.user,
        isAuthorized: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthorized: false,
        user: null,
      };
    case REGISTER_USER:
      return {
        ...state,
        isAuthorized: true,
        user: action.data.user,
      };
    default:
      return state;
  }
};
