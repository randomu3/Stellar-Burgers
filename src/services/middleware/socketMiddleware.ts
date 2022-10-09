import { TWSActions, wsActions as TWSA } from "../actions/wsActionTypes";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { RootState } from "..";
// socketMiddleware.js

export const socketMiddleware = (wsActions: typeof TWSA): Middleware => {
  return (store: MiddlewareAPI<Dispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch) => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === wsActions.CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload as string);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: wsActions.CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: wsActions.CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: wsActions.GET_ORDERS, payload: JSON.parse(data) });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: wsActions.CONNECTION_CLOSED, payload: event });
        };

        if (type === wsActions.SEND_ORDERS) {
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(action.payload));
        }
      }
      next(action);
    };
  };
};
