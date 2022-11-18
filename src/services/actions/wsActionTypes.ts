import { TOrder } from "../types/data";

// для создания объекта класса WebSocket:
export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS = "WS_GET_ORDERS";
export const WS_SEND_ORDERS = "WS_SEND_ORDERS";
export const WS_CLEAR_ORDERS = "WS_CLEAR_ORDERS";

export type TError = undefined | string;

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: TError;
}

export interface IWSGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: {
    readonly orders: Array<TOrder>;
    readonly success: boolean;
    readonly total: number;
    readonly totalToday: number;
  };
}

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: string;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSClearOrdersAction {
  readonly type: typeof WS_CLEAR_ORDERS;
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSClearOrdersAction
  | IWSConnectionClosedAction
  | IWSConnectionErrorAction
  | IWSConnectionSuccessAction
  | IWSGetOrdersAction;

export const wsActions = {
  CONNECTION_START: WS_CONNECTION_START,
  CONNECTION_SUCCESS: WS_CONNECTION_SUCCESS,
  CONNECTION_ERROR: WS_CONNECTION_ERROR,
  CONNECTION_CLOSED: WS_CONNECTION_CLOSED,
  GET_ORDERS: WS_GET_ORDERS,
  SEND_ORDERS: WS_SEND_ORDERS,
  CLEAR_ORDERS: WS_CLEAR_ORDERS,
};
