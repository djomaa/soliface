import React from 'react';

import { JsonBox } from 'components/json-box';

interface IProps {
  data: string;
}

export const EncodeAbiResult: React.FC<IProps> = (props) => {

  return (
    <JsonBox value={props.data} />
  )

}
