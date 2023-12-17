import React, { useContext } from "react";
import { Button } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { TabsProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import CombinedInput from "../../components/CombinedInput";
import Header from "../../components/Header";
import { StateProps } from "../home/Home";
import Analytics from "./analytics";
import SearchResults from "./searchResults";
import Filter from "../filters";
import {
  QueryContext,
  setQuery,
  resetFilters,
  resetQueryState,
} from "../../context/Query.context";
import {
  MainContentContainer,
  SearchLayoutContainer,
  VisualizationsTabContainer,
} from "./Search.styles";
import {
  ApplicationContext,
  SetFilterCollapsed,
} from "../../context/Application.context";

const SEARCH_ITEMS: TabsProps["items"] = [
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

export const Search: React.FC = () => {
  const { dataSet } = useParams<"dataSet">();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const { state: queryState, dispatch: queryDispatch } =
    useContext(QueryContext);
  const { state: applicationState, dispatch: applicationDispatch } =
    useContext(ApplicationContext);
  const { isFiltersCollaped } = applicationState;

  const onSubmit = (updatedValues: StateProps) => {
    setQuery(queryDispatch)(updatedValues);
    navigate(`/search/${updatedValues.dataSet}&query=${updatedValues.query}`);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const sendHome = () => {
    resetFilters(queryDispatch)();
    resetQueryState(queryDispatch)();
    navigate(`/`);
  };

  const handleFiltersCollapse = () => {
    SetFilterCollapsed(applicationDispatch)({
      isFiltersCollaped: !isFiltersCollaped,
    });
  };

  return (
    <MainContentContainer>
      <Header>
        <Button style={{ border: "none" }} onClick={sendHome}>
          Logo
        </Button>
        <CombinedInput
          initialValues={{
            dataSet: queryState.dataSet,
            query: queryState.query,
          }}
          onSubmit={onSubmit}
        />
        <Button
          type="text"
          icon={
            isFiltersCollaped ? (
              <MenuUnfoldOutlined style={{ color: "#08c" }} />
            ) : (
              <MenuFoldOutlined style={{ color: "#08c" }} />
            )
          }
          onClick={handleFiltersCollapse}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        >
          Filters
        </Button>
      </Header>
      <SearchLayoutContainer>
        <VisualizationsTabContainer
          defaultActiveKey="analytics"
          items={SEARCH_ITEMS}
          onChange={onChange}
          flex={isFiltersCollaped ? 1 : 4}
        />
        <Filter collapsed={isFiltersCollaped} />
      </SearchLayoutContainer>
    </MainContentContainer>
  );
};
