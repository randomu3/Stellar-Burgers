import { Provider } from "react-redux";
import { App } from "./components/App/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HashRouter as Router } from "react-router-dom";
import { store } from "./services";

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
