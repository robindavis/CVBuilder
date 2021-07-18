// Library Imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// User Imports
import RootApp from "./components/RootApp/RootApp";
import store from "./redux/store";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
