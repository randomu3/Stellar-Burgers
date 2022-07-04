const BASE_URL = "https://norma.nomoreparties.space/api";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkReponse)
    .then(({ data }) => data)
}
