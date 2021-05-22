import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./mocks/browser");
//   worker.start();
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
