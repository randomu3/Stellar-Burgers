import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { App } from "./components/App/app";
import { rootReducer } from "./services/reducers/rootreducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { wsActions } from "./services/actions/wsActionTypes";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsMiddleware = socketMiddleware(wsActions);
const middleware = [thunk, wsMiddleware];

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, enhancer);

export function Wrapper() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </DndProvider>
  );
}
