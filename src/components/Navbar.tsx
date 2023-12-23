import React from 'react';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styled from 'styled-components';

const narBarMenuItems: MenuProps['items'] = [
  { key: 'Home', label: <>Home</>, title: 'Home' },
  {
    key: 'Search',
    label: <>Search</>,
    title: 'Search',
    children: [
      { key: 'Papers', label: <>Paper</> },
      { key: 'Authors', label: <>Authors</> },
      { key: 'Venues', label: <>Venues</> }
    ]
  }
];
const NavbarMenuContainer = styled(Menu)`
  width: -webkit-fill-available;
`;

export const Navbar: React.FC = () => {
  return (
    <NavbarMenuContainer
      mode="horizontal"
      defaultSelectedKeys={['Home']}
      items={narBarMenuItems}
    />
  );
};
