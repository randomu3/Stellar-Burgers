import { BASE_URL } from "../../components/utils/burger-api";
import { checkReponse } from "../../components/utils/burger-api";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "../../components/utils/cookie";
import { AppThunk } from "../types";
export const LOGIN_USER: "LOGIN_USER" = "LOGIN_USER";
export const REGISTER_USER: "REGISTER_USER" = "REGISTER_USER";
export const LOGOUT_USER: "LOGOUT_USER" = "LOGOUT_USER";
export const CHECK_TOKEN: "CHECK_TOKEN" = "CHECK_TOKEN";
export const LOADING_TRUE: "LOADING_TRUE" = "LOADING_TRUE";
export const REFRESH_TOKEN: "REFRESH_TOKEN" = "REFRESH_TOKEN";

export type TUser = {
  email: string;
  name: string;
};

export type TUserLoginData = {
  email: string;
  password: string;
};

export type TUserData = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUser;
};

export type TRegisterDataUser = {
  password: string;
} & TUser;

export interface IAuthLoginUserAction {
  readonly type: typeof LOGIN_USER;
  readonly data: TUserData;
}
export interface IAuthRegisterUserAction {
  readonly type: typeof REGISTER_USER;
  readonly data: TUserData;
}
export interface IAuthLogoutUserAction {
  readonly type: typeof LOGOUT_USER;
}
export interface IAuthCheckTokenUserAction {
  readonly type: typeof CHECK_TOKEN;
  readonly data: {
    success: boolean;
    user: TUser;
  };
}
export interface IAuthLoadingTrueAction {
  readonly type: typeof LOADING_TRUE;
  readonly isLoading: boolean;
}
export interface IAuthRefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN;
  readonly accessToken: string;
}

export type TAuthActions =
  | IAuthLoginUserAction
  | IAuthRegisterUserAction
  | IAuthLogoutUserAction
  | IAuthCheckTokenUserAction
  | IAuthLoadingTrueAction
  | IAuthRefreshTokenAction;

export const register: AppThunk = (data: TRegisterDataUser) => (dispatch) => {
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  })
    .then(checkReponse)
    .then((data) => {
      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
      dispatch({
        type: REGISTER_USER,
        data,
      });
    })
    .catch((error) => console.log("error", error));
};

export const login: AppThunk = (data: TUserLoginData) => (dispatch) => {
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
    .then(checkReponse)
    .then((data) => {
      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
      dispatch({
        type: LOGIN_USER,
        data: data,
      });
    })
    .catch((error) => console.log("error", error));
};

export const logout: AppThunk = () => (dispatch) => {
  deleteCookie("accessToken");
  dispatch({
    type: LOGOUT_USER,
  });
  fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then(checkReponse)
    .then(() => {
      deleteCookie("refreshToken");
    })
    .catch((error) => console.log("error", error));
};

export const getUser: AppThunk = () => (dispatch) => {
  fetchWithRefresh(`${BASE_URL}/auth/user`, {
    headers: {
      authorization: getCookie("accessToken"),
    },
  })
    .then((data) => {
      if (!data) return;
      dispatch({
        type: CHECK_TOKEN,
        data: data,
      });
    })
    .catch((err) => console.log("error", err))
    .finally(() => {
      dispatch({
        type: LOADING_TRUE,
        isLoading: false,
      });
    });
};

// export const refreshToken = () => (dispatch: Dispatch) => {
//   return fetch(`${BASE_URL}/auth/token`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       token: getCookie("refreshToken"),
//     }),
//   })
//     .then(checkReponse)
//     .then((data) => {
//       setCookie("accessToken", data.accessToken);
//       setCookie("refreshToken", data.refreshToken);
//       dispatch({
//         type: REFRESH_TOKEN,
//         accessToken: data.accessToken,
//       });
//       return data as {
//         accessToken: string;
//         refreshToken: string;
//       };
//     });
// };

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkReponse);
};

export const patchUser: AppThunk = (data: TRegisterDataUser) => (dispatch) => {
  fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      if (data.success) {
        dispatch({
          type: CHECK_TOKEN,
          data: data,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const fetchWithRefresh = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (!(err instanceof Error)) return;
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      // @ts-ignore
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
