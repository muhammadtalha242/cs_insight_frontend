import React, { useCallback, useContext, useState } from "react";
import { Button, Layout, Space } from "antd";
import CombinedInput from "../../components/CombinedInput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DataSets } from "../../types/types";
import { QueryContext, setQuery } from "../../context/QueryContext";

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

//TODO: Create constants: Papers, Authors and the string mapping around the application
export type StateProps = {
  dataSet: DataSets;
  query: string;
};

export const Home: React.FC = () => {
  const { state: queryState, dispatch } = useContext(QueryContext);
  const [values, setValues] = useState<StateProps>({
    dataSet: queryState.dataSet,
    query: queryState.query,
  });

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (updatedValues: StateProps) => {
      setValues((prev) => ({ ...prev, ...updatedValues }));
      setQuery(dispatch)(updatedValues);
      // console.log("{ ...prev, ...updatedValues }", { ...updatedValues });

      navigate(`/search/${updatedValues.dataSet}?query=${updatedValues.query}`);
    },
    [dispatch]
  );

  const handleChangeView = useCallback((dataSet: DataSets) => {
    onSubmit({ dataSet, query: "all" });
  }, []);

  return (
    <ContentStyledContainer>
      HOME
      <CombinedInput initialValues={values} onSubmit={onSubmit} />
      <Space>
        <Button
          id="papers"
          name="papers"
          onClick={() => handleChangeView("papers")}
        >
          Papers
        </Button>
        <Button
          id="authors"
          name="authors"
          onClick={() => handleChangeView("authors")}
        >
          Authors
        </Button>
        <Button disabled>Venue</Button>
        <Button disabled>Topics</Button>
      </Space>
    </ContentStyledContainer>
  );
};
