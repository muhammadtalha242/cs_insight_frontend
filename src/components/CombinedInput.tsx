import React, { useState } from 'react';

import { Button, Input, Select, Space } from 'antd';
import styled from 'styled-components';

import { StateProps } from '../features/home/Home';

const options = [
  {
    value: 'papers',
    label: 'Papers',
  },
  {
    value: 'authors',
    label: 'Authors',
  },
];

type CombinedInputProps = {
  initialValues: { query: string; dataSet: string };
  onSubmit: (values: StateProps) => void;
};

const CombinedInputStyledContainer = styled(Space.Compact)`
  display: flex;
  flex-direction: row;
  padding: 16px;
  width: 45%;
`;

const CombinedInput: React.FC<CombinedInputProps> = ({
  initialValues: { query: inialQuery, dataSet: intialDataset },
  onSubmit,
}) => {
  const [query, setQuery] = useState(() => inialQuery);
  const [dataSet, setDataSet] = useState(() => intialDataset);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ query, dataSet });

    onSubmit({ query, dataSet });
  };

  return (
    <CombinedInputStyledContainer id="combined-inputs" block>
      <Select
        defaultValue="Papers"
        options={options}
        value={dataSet}
        id="search-type"
        onChange={(e) => setDataSet(e)}
      />
      <Input
        defaultValue="5G"
        name="query"
        value={query}
        id="search-input"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="5G"
        style={{ borderRadius: '0px' }}
      />
      <Button
        type="primary"
        onClick={onSearch}
        style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
      >
        Search
      </Button>
    </CombinedInputStyledContainer>
  );
};

export default CombinedInput;
