import * as React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
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
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.value}
          </li>
        )}
        // onChange={handleChange}
        renderInput={params => <TextField {...params} label={inputLabel} />}
      />
    </>
  );
};

export default Select;
