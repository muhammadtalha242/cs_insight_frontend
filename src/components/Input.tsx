import React from 'react';

import { TextField } from '@mui/material';

interface IInputProps {
  value?: string | number;
  setValue?: () => void;
}

const Input: React.FC<IInputProps> = () => {
  const onChangeHanlder = (e: React.ChangeEventHandler) => {
    console.log(e);
  };

  return (
    <>
      <TextField onChange={onChangeHanlder} />
    </>
  );
};

export default Input;
