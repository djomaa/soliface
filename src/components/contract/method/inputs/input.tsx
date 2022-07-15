import React from 'react';
import { TextFieldElement } from 'react-hook-form-mui';

export interface iInputProps {
  label: string;
  type: string;
  path: (string | number)[];
}
export const MethodInput: React.FC<iInputProps> = ({ label, type, path }) => {
  const name = path.join('.');
  return (
    <TextFieldElement
        key={label}
        name={name}
        label={`${label} - ${type}`}
        fullWidth
        variant='standard'
        margin='normal'
      />
  )
}
