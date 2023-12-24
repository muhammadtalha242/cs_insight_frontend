import React, { useCallback, useContext, useState } from 'react';

import { Button, Layout, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CombinedInput from '../../components/CombinedInput';
import { AUTHORS, Dataset, PAPERS } from '../../constants/dataset.types';
import { QueryContext, setQuery } from '../../context/Query.context';
import {
  ApplicationContext,
  setSelectedDataSet
} from '../../context/Application.context';

const { Content } = Layout;

const ContentStyledContainer = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #91caff;
  height: inherit;
  width: 100%;
`;

export type StateProps = {
  dataSet: Dataset;
  query: string;
};

export const Home: React.FC = () => {
  const { state: queryState, dispatch } = useContext(QueryContext);
  const { dispatch: applicationDispatch } = useContext(ApplicationContext);

  const [values, setValues] = useState<StateProps>({
    dataSet: queryState.dataSet,
    query: queryState.query
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (updatedValues: StateProps) => {
      setValues(prev => ({ ...prev, ...updatedValues }));
      setSelectedDataSet(applicationDispatch)({
        dataSet: updatedValues.dataSet
      });

      setQuery(dispatch)(updatedValues);

      navigate(`/search/${updatedValues.dataSet}?query=${updatedValues.query}`);
    },
    [dispatch]
  );

  const handleChangeView = useCallback((dataSet: Dataset) => {
    onSubmit({ dataSet, query: 'all' });
  }, []);

  return (
    <ContentStyledContainer>
      HOME
      <CombinedInput initialValues={values} onSubmit={onSubmit} />
      <Space>
        <Button
          id="papers"
          name="papers"
          onClick={() => handleChangeView(PAPERS)}
        >
          Papers
        </Button>
        <Button
          id="authors"
          name="authors"
          onClick={() => handleChangeView(AUTHORS)}
        >
          Authors
        </Button>
        <Button disabled>Venue</Button>
        <Button disabled>Topics</Button>
      </Space>
    </ContentStyledContainer>
  );
};
