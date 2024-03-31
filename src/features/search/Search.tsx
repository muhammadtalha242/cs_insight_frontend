import React, { useCallback, useContext } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Tab } from '@mui/material';

import { Button } from 'antd';
import type { TabsProps } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import CombinedInput from '../../components/CombinedInput';
import Header from '../../components/Header';
import {
  AUTHORS,
  Dataset,
  PAPERS,
  VENUES
} from '../../constants/dataset.types';
import {
  ApplicationContext,
  SetFilterCollapsed,
  setSelectedDataSet
} from '../../context/Application.context';
import {
  QueryContext,
  setQuery,
  resetFilters,
  resetQueryState
} from '../../context/Query.context';
import Filter from '../filters';
import { StateProps } from '../home/Home';

import Analytics from './analytics';
import {
  MainContentContainer,
  SearchLayoutContainer,
  StyledTabs,
  VisualizationsTabContainer
} from './Search.styles';
import SearchResults from './searchResults';

const SEARCH_ITEMS: TabsProps['items'] = [
  {
    key: 'search-results',
    label: 'Search Results',
    children: <SearchResults />,
    disabled: true
  },
  {
    key: 'analytics',
    label: 'Analytics',
    children: <Analytics />
  }
];

export const Search: React.FC = () => {
  const { dataSet } = useParams<'dataSet'>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const navigate = useNavigate();
  const { state: queryState, dispatch: queryDispatch } =
    useContext(QueryContext);
  const { state: applicationState, dispatch: applicationDispatch } =
    useContext(ApplicationContext);
  const { isFiltersCollaped } = applicationState;

  const onSubmit = (updatedValues: StateProps) => {
    setQuery(queryDispatch)(updatedValues);
    setSelectedDataSet(applicationDispatch)({ dataSet: updatedValues.dataSet });
    console.log('updatedValues.dataSet', updatedValues.dataSet);
    navigate(`/search/${updatedValues.dataSet}&query=${updatedValues.query}`);
  };

  const onChange = (key: string) => {
    // console.log(key);
  };

  const sendHome = () => {
    resetFilters(queryDispatch)();
    resetQueryState(queryDispatch)();
    navigate(`/`);
  };

  const handleChangeView = useCallback((dataSet: Dataset) => {
    onSubmit({ dataSet, query: 'all' });
  }, []);

  const handleFiltersCollapse = () => {
    SetFilterCollapsed(applicationDispatch)({
      isFiltersCollaped: !isFiltersCollaped
    });
  };

  return (
    <MainContentContainer>
      <Header>
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Button style={{ border: 'none' }} onClick={sendHome}>
            Logo
          </Button>
          <Button
            style={{ border: 'none' }}
            onClick={() => handleChangeView(PAPERS)}
          >
            Papers
          </Button>
          <Button
            style={{ border: 'none' }}
            onClick={() => handleChangeView(AUTHORS)}
          >
            Authors
          </Button>
          <Button
            style={{ border: 'none' }}
            onClick={() => handleChangeView(VENUES)}
          >
            Venues
          </Button>
        </div>
        {/* <CombinedInput
          initialValues={{
            dataSet: queryState.dataSet,
            query: queryState.query
          }}
          onSubmit={onSubmit}
        /> */}
        <Button
          type="text"
          icon={
            isFiltersCollaped ? (
              <MenuUnfoldOutlined style={{ color: '#08c' }} />
            ) : (
              <MenuFoldOutlined style={{ color: '#08c' }} />
            )
          }
          onClick={handleFiltersCollapse}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64
          }}
        ></Button>
      </Header>
      <SearchLayoutContainer>
        <VisualizationsTabContainer
          defaultActiveKey="analytics"
          items={SEARCH_ITEMS}
          onChange={onChange}
          flex={isFiltersCollaped ? 1 : 4}
        />
        <StyledTabs
          // defaultActiveKey="analytics"
          // items={SEARCH_ITEMS}
          // onChange={onChange}
          flex={isFiltersCollaped ? 1 : 4}
        />
        <Filter collapsed={isFiltersCollaped} />
      </SearchLayoutContainer>
    </MainContentContainer>
  );
};
