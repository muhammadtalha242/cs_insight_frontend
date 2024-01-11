import React, { ChangeEvent } from 'react';

import { TextField, Box } from '@mui/material';

interface RangeInputProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({ handleChange }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
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
      <Box width={20} /> {/* This creates space between the two TextFields */}
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
    </Box>
  );
};

export default RangeInput;
