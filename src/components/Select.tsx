import * as React from 'react';

import { Autocomplete, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import SelectMUI, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

interface IOption {
  key: string;
  value: string;
}

interface ISelectProps {
  options: IOption[];
  multiple?: boolean;
  inputLabel: string;
}

const Select: React.FC<ISelectProps> = ({ options, multiple, inputLabel }) => {
  const theme = useTheme();
  const [selectedOption, setselectedOption] = React.useState<string[]>([]);

  const handleChange = (
    event: React.SyntheticEvent,
    value: IOption[],
    reason: string,
    details?: string
  ) => {
    console.log('value', value);

    // setselectedOption(
    //   // On autofill we get a stringified value.
    // //   typeof value === 'string' ? value.split(',') : value
    // );
  };

  return (
    <>
      <Autocomplete
        multiple={multiple}
        limitTags={2}
        id="tags-outlined"
        options={options}
        getOptionLabel={option => option.value}
        filterSelectedOptions
        onChange={handleChange}
        renderInput={params => <TextField {...params} label={inputLabel} />}
      />
    </>
  );
};

export default Select;
