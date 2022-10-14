import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from "./actions/wsActionTypes";
import { rootReducer } from "./reducers/rootreducer";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const composeEnhancers =
  // @ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsMiddleware = socketMiddleware(wsActions);
const middleware = [thunk, wsMiddleware];

const enhancer = composeEnhancers(applyMiddleware(...middleware));
export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
