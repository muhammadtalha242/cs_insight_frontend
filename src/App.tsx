import { ConfigProvider } from "antd";
import React from "react";

import "./App.css";
import Home from "./features/home";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: "#00b96b",
        borderRadius: 2,

        // Alias Token
        colorBgContainer: "#f6ffed",
      },
    }}
  >
    <Home />
  </ConfigProvider>
);

export default App;
