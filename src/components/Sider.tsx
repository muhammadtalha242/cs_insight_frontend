import React, { ReactNode } from "react";

import styled from "styled-components";

import { Color } from "../themes";

const SiderContainer = styled.aside`
  box-sizing: border-box;
  background-color: ${Color.white80};
  border-left: 1px solid ${Color.lightSilver};
  transition: flex-basis 0.5s ease;
  width: 22rem;
  height: auto;
  overflow: auto;

  &.collapsed {
    flex: 0;
    overflow: hidden;
  }
`;

export type SiderProps = {
  collapsed: boolean;
  children?: ReactNode;
};

const Sider: React.FC<SiderProps> = ({ children, collapsed }) => {
  return (
    <SiderContainer className={collapsed ? "collapsed" : ""}>
      {children}
    </SiderContainer>
  );
};

export default Sider;
