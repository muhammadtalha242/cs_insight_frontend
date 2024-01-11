import React from 'react';

import { TextField } from '@mui/material';

interface IInputProps {
  value?: string | number;
  setValue?: (value: string | number) => void;
}

type IWrapperInputProps = IInputProps & React.ComponentProps<typeof TextField>;

const Input: React.FC<IWrapperInputProps> = props => {
  const { setValue } = props;
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event.target.value);

    if (setValue) {
      setValue(event.target.value);
    }
  };

  return (
    <>
      <TextField onChange={onChangeHandler} {...props} />
    </>
  );
};

export default Input;
