import React, { useCallback, useState } from "react";
import { Button, Layout } from "antd";
import CombinedInput from "../../components/CombinedInput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//TODO: Create constants: Papers, Authors and the string mapping around the application
export type StateProps = {
  dataSet: string;
  query: string;
};

export const Home: React.FC = () => {
  const [values, setValues] = useState<StateProps>({
    dataSet: "authors",
    query: "5G",
  });
  const navigate = useNavigate();

  const onSubmit = useCallback((updatedValues: StateProps) => {
    setValues((prev) => ({ ...prev, ...updatedValues }));
    console.log("{ ...prev, ...updatedValues }", { ...updatedValues });
    navigate(`/search/${updatedValues.dataSet}?query=${updatedValues.query}`);
  }, []);

  const handleChangeView = useCallback((dataSet: string) => {
    onSubmit({ dataSet, query: "all" });
  }, []);

  return (
    <ContentStyledContainer>
      HOME
      <CombinedInput initialValues={values} onSubmit={onSubmit} />
      <ButtonGroup>
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
      </ButtonGroup>
    </ContentStyledContainer>
  );
};
