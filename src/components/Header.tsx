import React from "react";
import styled from "styled-components";
import { Button, Layout } from "antd";

import { black80, white80 } from "../constants/colors";
import { Navbar } from "./Navbar";

const { Header: HeaderAntd } = Layout;
const HeaderComponets = styled(HeaderAntd)`
  background-color: ${white80};
  border-bottom: 1px ${black80} solid;
`;

export const Header: React.FC = () => {
  return (
    <HeaderComponets style={{ display: "flex", alignItems: "center" }}>
      <Button style={{ border: "none" }}> Logo</Button>
      <Navbar />
    </HeaderComponets>
  );
};
