import React, { useCallback, useEffect, useRef } from "react";
import Sider, { SiderProps } from "../../components/Sider";
import { Button, InputNumber, Select, Space } from "antd";
import {
  DeleteTwoTone,
  InfoCircleOutlined,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

import { useFilter } from "../../context/FilterContext";
import {
  FilterContentContainer,
  InputNumberFilterContainer,
  LabelFilterContainer,
  SelectFilterContainer,
} from "./Filters.styles";
import {
  ACCESS_TYPE,
  FIELDS_OF_STUDY,
  TYPES_OF_PAPER,
} from "../../constants/consts";

export const Filter: React.FC<SiderProps> = ({ collapsed, children }) => {
  const filter = useFilter();
  const filterRef = useRef(filter.filter);

  // debounce in FilterRange uses an old reference otherwise and deletes filters
  useEffect(() => {
    filterRef.current = filter.filter;
  }, [filter.filter]);

  const clearFilters = useCallback(() => {
    filter.setFilter({
      yearStart: "",
      yearEnd: "",
      citationsMin: "",
      citationsMax: "",
      authors: [],
      venues: [],
      accessType: null,
      typesOfPaper: [],
      fieldsOfStudy: [],
      publishers: [],
      metric: filter.filter.metric,
    });
  }, []);
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const typesOfPapers = TYPES_OF_PAPER.map((type) => ({
    value: type,
    label: type.toLocaleUpperCase(),
  }));
  const fieldsOfStudy = FIELDS_OF_STUDY.map((type) => ({
    value: type,
    label: type.toLocaleUpperCase(),
  }));
  const accessTypes = ACCESS_TYPE.map((type) => ({
    value: type,
    label: type.toLocaleUpperCase(),
  }));

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Sider collapsed={collapsed}>
      <FilterContentContainer>
        <Space direction="vertical" size={"large"}>
          <Button
            type="default"
            icon={<DeleteTwoTone />}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
          <InputNumberFilterContainer id="years-of-publications">
            <LabelFilterContainer>
              Year of Publications
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Space size={"large"}>
              <InputNumber placeholder="From" size="large" style={{}} />
              <InputNumber placeholder="To" size="large" />
            </Space>
          </InputNumberFilterContainer>
          <SelectFilterContainer id="authors">
            <LabelFilterContainer>
              Authors
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Select
              showSearch
              placeholder="Search"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[]}
              style={{ width: "100%" }}
            />
          </SelectFilterContainer>
          <SelectFilterContainer id="venues">
            <LabelFilterContainer>
              Venues
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Select
              showSearch
              placeholder="Search"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[]}
              style={{ width: "100%" }}
            />
          </SelectFilterContainer>
          <SelectFilterContainer id="paper-types">
            <LabelFilterContainer>
              Types of papers
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Select
              showSearch
              placeholder="Select"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={typesOfPapers}
              style={{ width: "100%" }}
            />
          </SelectFilterContainer>
          <SelectFilterContainer id="study-fields">
            <LabelFilterContainer>
              Field of Study
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Select
              showSearch
              placeholder="Select"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={fieldsOfStudy}
              style={{ width: "100%" }}
            />
          </SelectFilterContainer>
          <SelectFilterContainer id="publishers">
            <LabelFilterContainer>
              Publishers
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Select
              showSearch
              placeholder="Search"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[]}
              style={{ width: "100%" }}
            />
          </SelectFilterContainer>
          <SelectFilterContainer id="access-types">
            <LabelFilterContainer>
              Access Type
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Select
              showSearch
              placeholder="Search"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={accessTypes}
              style={{ width: "100%" }}
            />
          </SelectFilterContainer>

          <InputNumberFilterContainer id="citations">
            <LabelFilterContainer>
              Citations
              <InfoCircleOutlined />
            </LabelFilterContainer>
            <Space size={"large"}>
              <InputNumber placeholder="Min" size="large" style={{}} />
              <InputNumber placeholder="Max" size="large" />
            </Space>
          </InputNumberFilterContainer>
          <Space size={"large"}>
            <Button
              type="default"
              icon={<CheckCircleTwoTone />}
              onClick={() => filter.setFilter({ ...filter.filter })}
            >
              Apply
            </Button>
            <Button
              type="default"
              icon={<CloseCircleTwoTone />}
              onClick={clearFilters}
            >
              Cancle
            </Button>
          </Space>
          {children}
        </Space>
      </FilterContentContainer>
    </Sider>
  );
};
