import React from 'react'


import { TextFieldElement } from 'react-hook-form-mui';
import { IDefaultProps } from '../use-input';
import { useAdornments } from './use-adornments';
import { useLabel } from './use-label';

interface IProps extends IDefaultProps {
}

export const DefaultInput: React.FC<IProps> = (props) => {

  return (
    <TextFieldElement
      {...props.fieldProps}
      label={useLabel(props.path)}
      name={props.position.join('.')}
      InputProps={{
        startAdornment: useAdornments('start', ...props.startAdornments ?? []),
        endAdornment: useAdornments('start', ...props.endAdornments ?? [])
      }}
    />
  )
}
