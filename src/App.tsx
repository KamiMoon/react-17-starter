import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "auth/PrivateRoute";
import Navbar from "components/navbar/Navbar";
import Login from "auth/Login";
import NotAuthorized from "auth/NotAuthorized";
import Crud from "crud/Crud";
import { PostsList } from "features/posts/PostsList";
import { AddPostForm } from "features/posts/AddPostForm";
import { SinglePostPage } from "features/posts/SinglePagePost";
import { EditPostForm } from "features/posts/EditPostForm";
import { UsersList } from "features/users/UsersList";
import { UserPage } from "features/users/UserPage";
import { NotificationsList } from "features/notifications/NotificationList";
import "./App.css";

import { Layout } from "antd";
const { Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout className="layout">
        <Navbar />
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Switch>
              <Route path="/crud" component={Crud} />
              <Route path="/login" component={Login} />
              <Route path="/not-authorized" component={NotAuthorized} />
              <Route exact path="/" component={PostsList} />
              <Route
                exact
                path="/posts/view/:postId"
                component={SinglePostPage}
              />
              <Route
                exact
                path="/posts/edit/:postId"
                component={EditPostForm}
              />
              <Route exact path="/posts/add" component={AddPostForm} />
              <PrivateRoute exact path="/users" component={UsersList} />
              <Route exact path="/users/:userId" component={UserPage} />
              <Route
                exact
                path="/notifications"
                component={NotificationsList}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Eric Kizaki 2021</Footer>
      </Layout>
    </div>
  );
}

export default App;
