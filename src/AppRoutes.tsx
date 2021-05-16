import { Route, Switch, Redirect } from "react-router-dom";
import Login from "auth/Login";
import NotAuthorized from "auth/NotAuthorized";
import { PostsList } from "features/posts/PostsList";
import { AddPostForm } from "features/posts/AddPostForm";
import { SinglePostPage } from "features/posts/SinglePagePost";
import { EditPostForm } from "features/posts/EditPostForm";
import { UsersList } from "features/users/UsersList";
import { UserPage } from "features/users/UserPage";
import { NotificationsList } from "features/notifications/NotificationList";
import PrivateRoute from "auth/PrivateRoute";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/not-authorized" component={NotAuthorized} />
      <Route exact path="/" component={PostsList} />
      <Route exact path="/posts/view/:postId" component={SinglePostPage} />
      <Route exact path="/posts/edit/:postId" component={EditPostForm} />
      <Route exact path="/posts/add" component={AddPostForm} />
      <PrivateRoute exact path="/users" component={UsersList} />
      <Route exact path="/users/:userId" component={UserPage} />
      <Route exact path="/notifications" component={NotificationsList} />
      <Redirect to="/" />
    </Switch>
  );
}
