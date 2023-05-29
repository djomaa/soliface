import Box from '@mui/material/Box';
import { useLogger } from 'hooks/use-logger';
import React, { useEffect } from 'react';

import { AbiInput } from 'types/abi';

import { AbiInputComponent } from '../abi-input/abi-input.component';
import { AbiInputsContainer } from './abi-inputs.container';
import { AbiInputsCtxProvider, useAbiInputsCtx } from './ctx/abi-inputs.ctx';
import { Navigation } from './navigation';

interface IProps {
  inputs: AbiInput[];
  /**
   * form name prefix
   */
  prefix: string;
}
export const AbiInputsComponentCore: React.FC<IProps> = ({ inputs, prefix }) => {
  const [Logger] = useLogger(AbiInputsComponentCore)

  const ctx = useAbiInputsCtx();
  useEffect(() => {
    Logger.sub('useEffect(ctx.elements)').debug(ctx.map);
  }, [ctx])

  const elements = React.useMemo(() => {
    return inputs.map<React.ReactElement<{ labels: any[] }>>((input, i) => {
      return <AbiInputComponent key={input.name} input={input} labels={[input.name]} path={[prefix, i]} />
    })
  }, [inputs, prefix]);

  return (
    <Box
    >
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <Navigation />
        <Box
          ref={(node) => ctx.setInputsContainer(node as any as HTMLElement)}
          style={{
            width: '100%',
            maxHeight: '100%',
            borderImage: 'linear-gradient(to right, white, black, white) 10%',
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderLeft: '1px solid',
            overflowY: 'scroll',
          }}
        >
          <AbiInputsContainer>
            {elements}
          </AbiInputsContainer>
        </Box>
      </Box>
    </Box >
  )
}

export const AbiInputsComponent: React.FC<IProps> = (props) => {
  return (
    <AbiInputsCtxProvider>
      <AbiInputsComponentCore {...props} />
    </AbiInputsCtxProvider>
  );
}
