import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./auth/Login";
import Crud from "./crud/Crud";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/crud">
          <Crud />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
