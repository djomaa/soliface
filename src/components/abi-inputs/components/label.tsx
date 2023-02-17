import React, { useEffect } from 'react';
import { Path } from './path';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AbiInput } from 'types/abi';
import { InputLabel } from '../types';
import { useAbiInputsCtx } from '../abi-inputs.ctx';

interface IProps {
  input: AbiInput;
  labels: InputLabel[];
  action?: React.ReactElement;
}
export const Label: React.FC<IProps> = ({ input, labels, action }) => {
  const { register } = useAbiInputsCtx();

  const ref = React.useRef(null);

  useEffect(() => {
    register(labels, ref);
  }, [labels, ref])

  return (
    <Box
      style={{
        width: '100%',
        background: '#F0F0F0',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant='subtitle1' ref={ref}>
            <b>
              <Path parts={labels} />
            </b>
          </Typography>
          <Typography variant='overline' style={{ textTransform: 'unset' }}>
            {input.internalType}
          </Typography>
        </Box>
        {action && (
          <Box>
            {action}
          </Box>
        )}
      </Box>
    </Box>
  )
}
