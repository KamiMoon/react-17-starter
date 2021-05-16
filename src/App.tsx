import React from "react";
import Navbar from "components/navbar/Navbar";
import AppRoutes from "./AppRoutes";
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
            <AppRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Eric Kizaki 2021</Footer>
      </Layout>
    </div>
  );
}

export default App;
