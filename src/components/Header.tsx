import React, { ReactNode } from "react";
import styled from "styled-components";
import { Button, Layout } from "antd";

import { black80 } from "../constants/colors";

const { Header: HeaderAntd } = Layout;
const HeaderComponets = styled(HeaderAntd)`
  border-bottom: 1px ${black80} solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <HeaderComponets>
      <Button style={{ border: "none" }}>Logo</Button>
      {children}
    </HeaderComponets>
  );
};

export default Header;
