import { JsonBox } from 'components/json-box';
import React from 'react';

interface IProps {
  data: string;
}

export const EncodeAbiResult: React.FC<IProps> = (props) => {

  return (
    <JsonBox value={props.data} />
  )

}
