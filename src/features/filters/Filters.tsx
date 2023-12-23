import React, { useCallback, useEffect, useRef } from 'react';

import {
  DeleteTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone
} from '@ant-design/icons';

import { Button, InputNumber, Select, Space } from 'antd';

import { Collapsible } from '../../components/Collapsible';
import Sider, { SiderProps } from '../../components/Sider';
import {
  ACCESS_TYPE,
  FIELDS_OF_STUDY,
  TYPES_OF_PAPER
} from '../../constants/consts';
import { useFilter } from '../../context/Filter.context';

import { FilterContentContainer } from './Filters.styles';

export const Filter: React.FC<SiderProps> = ({ collapsed, children }) => {
  const filter = useFilter();
  const filterRef = useRef(filter.filter);

  // debounce in FilterRange uses an old reference otherwise and deletes filters
  useEffect(() => {
    filterRef.current = filter.filter;
  }, [filter.filter]);

  const clearFilters = useCallback(() => {
    filter.setFilter({
      yearStart: '',
      yearEnd: '',
      citationsMin: '',
      citationsMax: '',
      authors: [],
      venues: [],
      accessType: null,
      typesOfPaper: [],
      fieldsOfStudy: [],
      publishers: [],
      metric: filter.filter.metric
    });
  }, []);
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const typesOfPapers = TYPES_OF_PAPER.map(type => ({
    value: type,
    label: type.toLocaleUpperCase()
  }));
  const fieldsOfStudy = FIELDS_OF_STUDY.map(type => ({
    value: type,
    label: type.toLocaleUpperCase()
  }));
  const accessTypes = ACCESS_TYPE.map(type => ({
    value: type,
    label: type.toLocaleUpperCase()
  }));

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Sider collapsed={collapsed}>
      <FilterContentContainer>
        <Button type="default" icon={<DeleteTwoTone />} onClick={clearFilters}>
          Clear Filters
        </Button>
        <Collapsible title="Year of Publications">
          <Space size={'large'}>
            <InputNumber placeholder="From" size="large" style={{}} />
            <InputNumber placeholder="To" size="large" />
          </Space>
        </Collapsible>
        <Collapsible title="Authors">
          <Select
            showSearch
            placeholder="Search"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[]}
            style={{ width: '100%' }}
          />
        </Collapsible>

        <Collapsible title="Venues">
          <Select
            showSearch
            placeholder="Search"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[]}
            style={{ width: '100%' }}
          />
        </Collapsible>

        <Collapsible title="Types of papers">
          <Select
            showSearch
            placeholder="Select"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={typesOfPapers}
            style={{ width: '100%' }}
          />
        </Collapsible>
        <Collapsible title="Field of Study">
          <Select
            showSearch
            placeholder="Select"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={fieldsOfStudy}
            style={{ width: '100%' }}
          />
        </Collapsible>
        <Collapsible title="Publishers">
          <Select
            showSearch
            placeholder="Search"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[]}
            style={{ width: '100%' }}
          />
        </Collapsible>
        <Collapsible title="Access Type">
          <Select
            showSearch
            placeholder="Search"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={accessTypes}
            style={{ width: '100%' }}
          />
        </Collapsible>

        <Collapsible title="Citations">
          <Space size={'large'}>
            <InputNumber placeholder="Min" size="large" style={{}} />
            <InputNumber placeholder="Max" size="large" />
          </Space>
        </Collapsible>
        <Space size={'large'}>
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
      </FilterContentContainer>
    </Sider>
  );
};
