import { BASE_URL } from "../../components/utils/burger-api";
import { checkReponse } from "../../components/utils/burger-api";
import { deleteCookie, getCookie, setCookie } from "../../components/utils/cookie";

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const CHECK_TOKEN = "CHECK_TOKEN";
export const LOADING_TRUE = "LOADING_TRUE";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const register = (data) => (dispatch) => {
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
        data: data,
      });
    })
    .catch((error) => console.log("error", error));
};

export const login = (data) => (dispatch) => {
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

export const logout = () => (dispatch) => {
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

export const getUser = () => (dispatch) => {
  fetchWithRefresh(`${BASE_URL}/auth/user`, {
    headers: {
      authorization: getCookie("accessToken"),
    },
  })
    .then((data) => {
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

export const refreshToken = () => (dispatch) => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then(checkReponse)
    .then((data) => {
      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
      dispatch({
        type: REFRESH_TOKEN,
        accessToken: data.accessToken,
      });
    });
};

export const patchUser = (data) => (dispatch) => {
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

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};