import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./auth/Login";
import Crud from "./crud/Crud";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";

import { Route, Switch, Redirect } from "react-router-dom";

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
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <AddPostForm />
              <PostsList />
            </React.Fragment>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
