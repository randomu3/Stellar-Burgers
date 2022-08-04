import { sendOrders } from "../../components/utils/burger-api";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

// thunk
export function postOrder(idOrdersArray) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    sendOrders(idOrdersArray)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          data: res.order.number,
        });
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
}
