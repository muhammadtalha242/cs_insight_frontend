import React, { useState } from "react";
import { Button, Layout, Tabs } from "antd";
import styled from "styled-components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { TabsProps } from "antd";

import CombinedInput from "../../components/CombinedInput";
import Header from "../../components/Header";
import { StateProps } from "../home/Home";
import Analytics from "./analytics";
import SearchResults from "./searchResults";
import Drawer from "../../components/Drawer";

const { Content } = Layout;

const ContentStyledContainer = styled(Content)``;

export const Search: React.FC = () => {
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [open, setOpen] = useState(false);
  const { dataSet } = useParams<"dataSet">();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const onSubmit = (updatedValues: StateProps) => {
    navigate(
      `/search?dataSet=${updatedValues.dataSet}&query=${updatedValues.query}`
    );
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

  return (
    <ContentStyledContainer>
      <Header>
        <CombinedInput
          initialValues={{
            dataSet: dataSet || "papers",
            query: query || "all",
          }}
          onSubmit={onSubmit}
        />
        <Button type="primary" onClick={showDrawer}>
          Filters
        </Button>
        <Drawer isOpen={open} onClose={onClose} />
      </Header>
      <section style={{ paddingLeft: "50px", paddingRight: "20px" }}>
        <Tabs defaultActiveKey="analytics" items={items} onChange={onChange} />
      </section>
    </ContentStyledContainer>
  );
};
