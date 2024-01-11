import React, { useContext, useState } from 'react';

import { CheckCircleTwoTone } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField } from '@mui/material';

import { Collapsible } from '../../components/Collapsible';
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
import {
  QueryContext,
  resetFilters,
  setFilters as setFiltersContext
} from '../../context/Query.context';

import { FilterContentContainer } from './Filters.styles';

export const Filter: React.FC<SiderProps> = ({ collapsed, children }) => {
  const { dispatch: queryDispatch, state: queryState } =
    useContext(QueryContext);
  const [filter, setFilter] = useState<filterTypes>({ ...queryState.filters });

  const typesOfPapers = TYPES_OF_PAPER.map(type => ({
    value: type,
    key: type.toLocaleUpperCase()
  }));

  const authors = TYPES_OF_PAPER.map(type => ({
    value: type,
    key: type.toLocaleUpperCase()
  }));
  const fieldsOfStudy = FIELDS_OF_STUDY.map(type => ({
    value: type,
    key: type.toLocaleUpperCase()
  }));
  const accessTypes = ACCESS_TYPE.map(type => ({
    value: type,
    key: type.toLocaleUpperCase()
  }));

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilter(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSelectChange =
    (
      name:
        | 'authors'
        | 'venues'
        | 'typesOfPaper'
        | 'fieldsOfStudy'
        | 'publishers'
        | 'metric'
        | 'accessType'
    ) =>
    (selectedOptions: string[] | string | null) => {
      setFilter(prev => ({ ...prev, [name]: selectedOptions }));
    };

  const rest = () => {
    resetFilters(queryDispatch)();
    setFilter(queryState.filters);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Sider collapsed={collapsed}>
      <FilterContentContainer>
        <Button variant="contained" startIcon={<DeleteIcon />} onClick={rest}>
          Clear Filters
        </Button>
        <Collapsible title="Year of Publications">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              id="yearStart"
              label="From"
              placeholder="From"
              name="yearStart"
              type="number"
              inputProps={{
                min: '1960'
              }}
              value={filter.yearStart}
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleChange}
            />
            <Box width={20} />
            <TextField
              id="yearEnd"
              label="To"
              placeholder="To"
              name="yearEnd"
              value={filter.yearEnd}
              type="number"
              inputProps={{
                min: '0'
              }}
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleChange}
            />
          </Box>
        </Collapsible>
        <Collapsible title="Authors">
          <SelectCustom
            route="authors"
            inputLabel="Authors"
            multiple
            options={authors}
            onChange={handleSelectChange('authors')}
          />
        </Collapsible>

        <Collapsible title="Venues">
          <SelectCustom
            route="authors"
            inputLabel="Venues"
            multiple
            options={authors}
            onChange={handleSelectChange('venues')}
          />
        </Collapsible>

        <Collapsible title="Types of papers">
          <SelectCustom
            route="authors"
            inputLabel="Types of papers"
            multiple
            onChange={handleSelectChange('typesOfPaper')}
            options={typesOfPapers}
          />
        </Collapsible>
        <Collapsible title="Field of Study">
          <SelectCustom
            route="authors"
            inputLabel="Field of Study"
            multiple
            onChange={handleSelectChange('fieldsOfStudy')}
            options={fieldsOfStudy}
          />
        </Collapsible>
        <Collapsible title="Publishers">
          <SelectCustom
            route="authors"
            inputLabel="Publishers"
            multiple
            onChange={handleSelectChange('publishers')}
            options={fieldsOfStudy}
          />
        </Collapsible>
        <Collapsible title="Access Type">
          <SelectCustom
            route="authors"
            inputLabel="Access Type"
            multiple
            onChange={handleSelectChange('accessType')}
            options={accessTypes}
          />
        </Collapsible>

        <Collapsible title="Citations">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              id="Min"
              label="Min"
              placeholder="Min"
              name="citationsMin"
              type="number"
              inputProps={{
                min: '0'
              }}
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleChange}
            />
            <Box width={20} />

            <TextField
              id="Max"
              label="Max"
              placeholder="Max"
              name="citationsMax"
              type="number"
              inputProps={{
                min: '0'
              }}
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleChange}
            />
          </Box>
        </Collapsible>
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            startIcon={<CheckCircleTwoTone />}
            onClick={() => setFiltersContext(queryDispatch)(filter)}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircleTwoTone />}
            onClick={rest}
          >
            Cancle
          </Button>
        </Box>
        {children}
      </FilterContentContainer>
    </Sider>
  );
};
