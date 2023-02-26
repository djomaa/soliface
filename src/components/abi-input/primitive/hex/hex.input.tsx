import React from 'react'


import { TextFieldElement } from 'react-hook-form-mui';
import { IDefaultProps } from '../primitive-input';
import { useAdornments } from '../../components/use-adornments';

interface IProps extends IDefaultProps {
}

export const HexInput: React.FC<IProps> = (props) => {

  return (
    <TextFieldElement
      {...props.fieldProps}
      InputProps={{
        startAdornment: useAdornments('start', ...props.startAdornments ?? []),
        endAdornment: useAdornments('start', ...props.endAdornments ?? [])
      }}
    />
  )
}
