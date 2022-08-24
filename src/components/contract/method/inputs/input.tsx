import React from 'react';
import { TextFieldElement } from 'react-hook-form-mui';

export interface iInputProps {
  label: string;
  type: string;
  path: (string | number)[];
  defaultValue?: string;
}
export const MethodInput: React.FC<iInputProps> = ({ label, type, path, defaultValue }) => {
  const name = path.join('.');
  return (
    <TextFieldElement
      fullWidth
      variant='standard'
      margin='normal'
      value={defaultValue}
      key={label}
      name={name}
      label={`${label} - ${type}`}
    />
  )
}
