import React, { ReactNode } from "react";
import styled from "styled-components";

const SiderContainer = styled.aside`
  position: fixed;
  right: 0;
  background-color: white;
  border-left: 1px solid #ddd;
  transition: width 0.3s ease;
  min-width: 20%;
  height: 100%;

  &.collapsed {
    width: 0;
    min-width: 0;
    max-width: 0;
    overflow: hidden;
    transition: width 0.3s ease;
  }
`;

export type SiderProps = {
  collapsed: boolean;
  children?: ReactNode;
};
const Sider: React.FC<SiderProps> = ({ children, collapsed }) => {
  return (
    <SiderContainer className={!collapsed ? "collapsed" : ""}>
      {children}
    </SiderContainer>
  );
};

export default Sider;
