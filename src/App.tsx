import React from "react";

import { Footer } from "antd/es/layout/layout";

import { ConfigProvider, Layout } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { Provider as ApplicationContextProvider } from "./context/Application.context";
import { FilterProvider } from "./context/Filter.context";
import { Provider as QueryContextProvider } from "./context/Query.context";
import Home from "./features/home";
import Search from "./features/search";
import { darkTheme } from "./themes";

import "./App.css";

const { Content } = Layout;

const ContentStyledContainer = styled(Content)``;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle: React.CSSProperties = {
  display: "flex",
};

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search/:dataSet",
    element: <Search />,
  },
]);
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
      <ContentStyledContainer>
        <ThemeProvider theme={darkTheme}>
          <ApplicationContextProvider>
            <QueryContextProvider>
              <FilterProvider>
                <RouterProvider router={Routes} />
              </FilterProvider>
            </QueryContextProvider>
          </ApplicationContextProvider>
        </ThemeProvider>
      </ContentStyledContainer>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
  </ConfigProvider>
);

export default App;
