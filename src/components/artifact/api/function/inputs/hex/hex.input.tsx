import React from 'react'


import { TextFieldElement } from 'react-hook-form-mui';
import { IDefaultProps } from '../base/base-input';
import { useAdornments } from '../components/use-adornments';
import { Label } from '../components/label';

interface IProps extends IDefaultProps {
}

export const HexInput: React.FC<IProps> = (props) => {

  return (
    <TextFieldElement
      {...props.fieldProps}
      label={<Label path={props.path} />}
      name={props.position.join('.')}
      InputProps={{
        startAdornment: useAdornments('start', ...props.startAdornments ?? []),
        endAdornment: useAdornments('start', ...props.endAdornments ?? [])
      }}
    />
  )
}
