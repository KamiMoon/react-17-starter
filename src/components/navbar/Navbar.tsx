import { Layout, Menu } from "antd";

import { Link } from "react-router-dom";

const { Header } = Layout;

export default function Navbar() {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">
          <Link to="/">Posts</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
