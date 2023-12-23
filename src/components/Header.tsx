import React, { ReactNode } from 'react';

import { Layout } from 'antd';
import styled from 'styled-components';

import { Color } from '../themes';

const { Header: HeaderAntd } = Layout;

const HeaderComponets = styled(HeaderAntd)`
  border-bottom: 1px ${Color.black80} solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px'
};

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <HeaderComponets style={headerStyle}>{children}</HeaderComponets>;
};

export default Header;
