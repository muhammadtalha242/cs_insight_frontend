import React, { ReactNode } from "react";
import styled from "styled-components";
import { Layout } from "antd";

import { Color } from "../themes";

const { Header: HeaderAntd } = Layout;

const HeaderComponets = styled(HeaderAntd)`
  border-bottom: 1px ${Color.black80} solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <HeaderComponets>{children}</HeaderComponets>;
};

export default Header;
