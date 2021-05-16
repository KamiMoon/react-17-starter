import { Layout, Menu } from "antd";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import { Link, useLocation } from "react-router-dom";
import { logout } from "redux/slicers/authSlice";

const { Header } = Layout;

export default function Navbar() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  let defaultSelectedKeys = ["posts"];

  let location = useLocation();

  if (location.pathname.includes("users")) {
    defaultSelectedKeys = ["users"];
  } else if (location.pathname.includes("login")) {
    defaultSelectedKeys = ["login"];
  }

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={defaultSelectedKeys}
        selectedKeys={defaultSelectedKeys}
      >
        <Menu.Item key="posts">
          <Link to="/">Posts</Link>
        </Menu.Item>
        {auth.isAuthenticated && (
          <Menu.Item key="users">
            <Link to="/users">Users</Link>
          </Menu.Item>
        )}

        {!auth.isAuthenticated && (
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}

        {auth.isAuthenticated && (
          <Menu.Item key="logout">
            <a onClick={doLogout}>Logout</a>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}
