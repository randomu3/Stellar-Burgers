export const ADD_FILLING = "ADD_FILLING";
export const ADD_BUN = "ADD_BUN";
export const DELETE_FILLING = "DELETE_FILLING";
export const MOVE_FILLING = "MOVE_ITEM";

export const addFilling = (payload) => ({ type: ADD_FILLING, payload });
export const addBun = (payload) => ({ type: ADD_BUN, payload });
export const delFilling = (payload) => ({ type: DELETE_FILLING, payload });
export const moveFilling = (payload) => ({ type: MOVE_FILLING, payload });
