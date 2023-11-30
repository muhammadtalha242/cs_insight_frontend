import React from "react";
import { ConfigProvider, Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { Provider as QueryContextProvider } from "./context/QueryContext";

import Home from "./features/home";
import Search from "./features/search";

import "./App.css";

const { Content } = Layout;

const ContentStyledContainer = styled(Content)`
  height: 100vh;
`;

const FooterStyled = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
`;
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
        <QueryContextProvider>
          <FilterProvider>
            <RouterProvider router={Routes} />
          </FilterProvider>
        </QueryContextProvider>
      </ContentStyledContainer>
      <FooterStyled>Footer</FooterStyled>
    </Layout>
  </ConfigProvider>
);

export default App;
