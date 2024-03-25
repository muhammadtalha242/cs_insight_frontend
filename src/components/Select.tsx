import * as React from 'react';

import { Autocomplete, TextField, CircularProgress } from '@mui/material';

import { AUTOCOMPLETE_ROUTES } from '../constants/consts';
import { useAutocomplete } from '../services/autocomplete';

interface IOption {
  key: string;
  value: string;
}

interface ISelectProps {
  route: AUTOCOMPLETE_ROUTES;
  options: IOption[];
  multiple?: boolean;
  inputLabel: string;
  onChange?: (selectedOptions: string[] | string | null) => void; // Updated type to match the Autocomplete's expectation
}

const Select: React.FC<ISelectProps> = ({
  options,
  multiple,
  inputLabel,
  route,
  onChange
}) => {
  const [, setSelectedOption] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const { data, isFetching } = useAutocomplete({ route, inputValue });

  const handleChange = (
    _: React.SyntheticEvent,
    value: IOption[] | IOption | null
  ) => {
    let selectedValues: string[] | string | null = null;

    if (Array.isArray(value)) {
      selectedValues = value.map(option => option.key);
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
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue.trim());
      }}
      renderOption={(props, option) => <li {...props}>{option.value}</li>}
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
