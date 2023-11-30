import React, { useContext, useState } from "react";
import { Button, Layout, Tabs } from "antd";
import styled from "styled-components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { TabsProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import CombinedInput from "../../components/CombinedInput";
import Header from "../../components/Header";
import { StateProps } from "../home/Home";
import Analytics from "./analytics";
import SearchResults from "./searchResults";
import Filter from "../filers";
import {
  QueryContext,
  setQuery,
  resetFilters,
  resetQueryState,
} from "../../context/QueryContext";

const { Content } = Layout;

const ContentStyledContainer = styled(Content)``;

export const Search: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { dataSet } = useParams<"dataSet">();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const navigate = useNavigate();
  const { state, dispatch } = useContext(QueryContext);
  console.log("state", state);

  const onSubmit = (updatedValues: StateProps) => {
    setQuery(dispatch)(updatedValues);
    navigate(`/search/${updatedValues.dataSet}&query=${updatedValues.query}`);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "search-results",
      label: "Search Results",
      children: <SearchResults />,
      disabled: true,
    },
    {
      key: "analytics",
      label: "Analytics",
      children: <Analytics />,
    },
  ];

  const sendHome = () => {
    resetFilters(dispatch)();
    resetQueryState(dispatch)();
    navigate(`/`);
  };

  return (
    <ContentStyledContainer>
      <Header>
        <Button style={{ border: "none" }} onClick={sendHome}>
          Logo
        </Button>
        <CombinedInput
          initialValues={{
            dataSet: state.dataSet,
            query: state.query,
          }}
          onSubmit={onSubmit}
        />
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ color: "#08c" }} />
            ) : (
              <MenuFoldOutlined style={{ color: "#08c" }} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </Header>
      <Layout hasSider>
        <section style={{ paddingLeft: "50px", paddingRight: "20px" }}>
          <Tabs
            defaultActiveKey="analytics"
            items={items}
            onChange={onChange}
          />
        </section>
        <Filter collapsed={collapsed} />
      </Layout>
    </ContentStyledContainer>
  );
};
