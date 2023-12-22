import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { Spacing } from "../themes";
import {
  InfoCircleOutlined,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons";
type CollapsibleProps = {
  children?: ReactNode;
  title: string;
};

const CollapsibleContainer = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
  background-color: lightblue;
  padding: 8px;
`;

const CollapsibleContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.open {
    margin-bottom: ${Spacing.larger};
  }
`;

const LabelFilterContainer = styled.label`
  text-align: start;
  font-size: medium;
  font-weight: 600;
  margin-left: 8px;
`;

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  title,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <CollapsibleContainer>
      <CollapsibleContainerHeader
        onClick={handleClick}
        className={isCollapsed ? "" : "open"}
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
