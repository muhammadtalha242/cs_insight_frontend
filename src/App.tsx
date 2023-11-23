import React from "react";
import { ConfigProvider, Layout } from "antd";

import "./App.css";
import Home from "./features/home";
import { Header } from "./components/Header";
import { Footer } from "antd/es/layout/layout";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        // colorPrimary: "#00b96b",
        // borderRadius: 2,
        // // Alias Token
        // colorBgContainer: "#f6ffed",
      },
    }}
  >
    <Layout>
      <Header />

      <Home />
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  </ConfigProvider>
);

export default App;
