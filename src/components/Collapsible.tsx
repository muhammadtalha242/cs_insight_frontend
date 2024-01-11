import React, { ReactNode, useState } from 'react';

import {
  InfoCircleOutlined,
  RightOutlined,
  DownOutlined
} from '@ant-design/icons';

import styled from 'styled-components';

import { Spacing } from '../themes';

type CollapsibleProps = {
  children?: ReactNode;
  title: string;
};

const CollapsibleContainer = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 8px;
`;

const CollapsibleContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.open {
    margin-bottom: 12px;
  }
`;

const LabelFilterContainer = styled.label`
  text-align: start;
  font-weight: 600;
  margin-left: 4px;
`;

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  title
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <CollapsibleContainer>
      <CollapsibleContainerHeader
        onClick={handleClick}
        className={isCollapsed ? '' : 'open'}
      >
        <span className="left">
          {isCollapsed ? <RightOutlined /> : <DownOutlined />}
          <LabelFilterContainer>{title}</LabelFilterContainer>
        </span>
        <InfoCircleOutlined className="right" />
      </CollapsibleContainerHeader>
      {!isCollapsed && children}
    </CollapsibleContainer>
  );
};
