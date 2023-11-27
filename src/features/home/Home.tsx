import React, { useState } from "react";
import { Layout } from "antd";
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

//TODO: Create constants: Papers, Authors and the string mapping around the application
export type StateProps = {
  dataSet: string;
  query: string;
};

export const Home: React.FC = () => {
  const [values, setValues] = useState<StateProps>({
    dataSet: "Authors",
    query: "5G",
  });
  const navigate = useNavigate();

  const onSubmit = (updatedValues: StateProps) => {
    setValues((prev) => ({ ...prev, ...updatedValues }));
    console.log("{ ...prev, ...updatedValues }", { ...updatedValues });
    navigate(`/search?dataSet=${values.dataSet}&query=${values.query}`);
  };

  return (
    <ContentStyledContainer>
      HOME
      <CombinedInput initialValues={values} onSubmit={onSubmit} />
    </ContentStyledContainer>
  );
};
