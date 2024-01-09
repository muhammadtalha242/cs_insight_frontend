import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  DeleteTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone
} from '@ant-design/icons';
import TextField from '@mui/material/TextField';

import { Button, InputNumber, Select, Space } from 'antd';

import { Collapsible } from '../../components/Collapsible';
import Input from '../../components/Input';
import SelectCustom from '../../components/Select';
import Sider, { SiderProps } from '../../components/Sider';
import {
  ACCESS_TYPE,
  ACCESS_TYPE_OPEN,
  FIELDS_OF_STUDY,
  TYPES_OF_PAPER,
  metrics
} from '../../constants/consts';
import { Filter as filterTypes } from '../../constants/types';

import { FilterContentContainer } from './Filters.styles';

export const Filter: React.FC<SiderProps> = ({ collapsed, children }) => {
  const [filter, setFilter] = useState<filterTypes>({
    yearStart: '1960',
    yearEnd: '',
    citationsMin: '',
    citationsMax: '',
    authors: [],
    venues: [],
    accessType: ACCESS_TYPE_OPEN,
    typesOfPaper: [],
    fieldsOfStudy: [],
    publishers: [],
    metric: metrics[0].value
  });

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

  const authors = TYPES_OF_PAPER.map(type => ({
    value: type,
    key: type.toLocaleUpperCase()
  }));
  const fieldsOfStudy = FIELDS_OF_STUDY.map(type => ({
    value: type,
    label: type.toLocaleUpperCase()
  }));
  const accessTypes = ACCESS_TYPE.map(type => ({
    value: type,
    label: type.toLocaleUpperCase()
  }));

  const handleChange = (event: React.ChangeEvent) => {
    setFilter(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Sider collapsed={collapsed}>
      <FilterContentContainer>
        <Button type="default" icon={<DeleteTwoTone />}>
          Clear Filters
        </Button>
        <Collapsible title="Year of Publications">
          <Space size={'large'}>
            <Input />
            <TextField
              id="yearStart"
              label="From"
              placeholder="From"
              name="yearStart"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleChange}
            />
            <TextField
              id="yearEnd"
              label="To"
              placeholder="To"
              name="yearEnd"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleChange}
            />
            {/* <InputNumber
              placeholder="To"
              name="yearEnd"
              value={filter.yearEnd}
              size="large"
            /> */}
          </Space>
        </Collapsible>
        <Collapsible title="Authors">
          <SelectCustom inputLabel="Authors" multiple options={authors} />
        </Collapsible>

        <Collapsible title="Venues">
          <SelectCustom inputLabel="Authors" multiple options={authors} />

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
            // onClick={() => filter.setFilter({ ...filter.filter })}
          >
            Apply
          </Button>
          <Button
            type="default"
            icon={<CloseCircleTwoTone />}
            // onClick={}
          >
            Cancle
          </Button>
        </Space>
        {children}
      </FilterContentContainer>
    </Sider>
  );
};
