import { Dispatch } from "redux";
import { sendOrders } from "../../components/utils/burger-api";
import { REFRESH_INGREDIENTS } from "./constructor";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly data: number
}
export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export type TPostOrderActions = 
| IPostOrderFailedAction
| IPostOrderRequestAction
| IPostOrderSuccessAction

// thunk
export function postOrder(idOrdersArray: Array<string>) {
  return function (dispatch: Dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    sendOrders(idOrdersArray)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          data: res.order.number,
        });
        dispatch({
          type: REFRESH_INGREDIENTS,
        });
      })
      .catch(() => {
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
}
