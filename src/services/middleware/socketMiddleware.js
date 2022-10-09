// socketMiddleware.js

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsActions.CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(payload);
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
          socket.send(JSON.stringify(payload));
        }
      }
      next(action);
    };
  };
};
