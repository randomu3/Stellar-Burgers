import {
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
  TPostOrderActions,
} from "../actions/index";

export type TOrderState = {
  data: null | number;
  dataRequest: boolean;
  dataFailed: boolean;
}

const initialState: TOrderState = {
  data: null,
  dataRequest: false,
  dataFailed: false,
};

// reducer
export const createdOrder = (
  state = initialState,
  action: TPostOrderActions
) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        dataRequest: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        dataFailed: false,
        data: action.data,
        dataRequest: false,
      };
    }
    case POST_ORDER_FAILED: {
      return { ...state, dataFailed: true, dataRequest: false };
    }
    default:
      return state;
  }
};
