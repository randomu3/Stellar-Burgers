import { getCookie } from "./cookie";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredientsRequest() {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkReponse)
    .then(({ data }) => data)
}

export function sendOrders(idOrdersArray) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "authorization": getCookie("accessToken")
    },
    body: JSON.stringify({
      ingredients: idOrdersArray,
    }),
  })
    .then(checkReponse)
}
