import React, { ReactNode } from "react";
import styled from "styled-components";
import { Color } from "../themes";

const SiderContainer = styled.aside`
  background-color: ${Color.white80};
  border-left: 1px solid ${Color.lightSilver};
  transition: width 0.3s ease;
  // height: 100%;
  flex: 1;
  transition: flex-basis 0.5s ease;

  &.collapsed {
    width: 0;
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
