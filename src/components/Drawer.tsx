import React from "react";

import { Drawer as DrawerAntd } from "antd";
import styled from "styled-components";

const DrawerContainer = styled(DrawerAntd)``;

const Drawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <DrawerContainer
      title="Filter"
      placement="right"
      closable={true}
      onClose={onClose}
      open={isOpen}
      getContainer={false}
    >
      <p>Some contents...</p>
    </DrawerContainer>
  );
};

export default Drawer;
