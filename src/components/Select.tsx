import * as React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Checkbox,
  TextField,
  CircularProgress
} from '@mui/material';

import { useQuery } from 'react-query';

import { AUTOCOMPLETE_ROUTES } from '../constants/consts';
import { autocomplete } from '../services/autocomplete';

interface IOption {
  key: string;
  id?: string;
  value: string;
}

interface ISelectProps {
  route: AUTOCOMPLETE_ROUTES;
  options: IOption[];
  multiple?: boolean;
  inputLabel: string;
  onChange?: (selectedOptions: string[] | string | null) => void; // Updated type to match the Autocomplete's expectation
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Select: React.FC<ISelectProps> = ({
  options,
  multiple,
  inputLabel,
  route,
  onChange
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const { data, isFetching } = useQuery(
    ['routes', inputValue],
    () => autocomplete({ route, inputValue }),
    {
      enabled: inputValue.length > 1
    }
  );

  console.log('data', data);

  const handleChange = (
    event: React.SyntheticEvent,
    value: IOption[] | IOption | null,
    reason: string
  ) => {
    let selectedValues: string[] | string | null = null;

    console.log('value', value);

    if (Array.isArray(value)) {
      selectedValues = value.map(option => option.value);
    } else if (value) {
      selectedValues = value.value;
    }

    setSelectedOption(
      Array.isArray(selectedValues)
        ? selectedValues
        : selectedValues
          ? [selectedValues]
          : []
    );

    // Call the custom onChange handler if provided
    if (onChange) {
      onChange(selectedValues);
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      id="tags-outlined"
      options={data || options}
      getOptionLabel={option => option.value}
      filterSelectedOptions
      loading={isFetching}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>{option.value}</li>
      )}
      onChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          label={inputLabel}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};

export default Select;
