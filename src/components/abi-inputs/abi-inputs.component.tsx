import Box from '@mui/material/Box';
import { useLogger } from 'hooks/use-logger';
import React, { useEffect } from 'react';

import { AbiInput } from 'types/abi';

import { AbiInputComponent } from '../abi-input/abi-input.component';
import { AbiInputsContainer } from './abi-inputs.container';
import { AbiInputsCtxProvider, useAbiInputsCtx } from './ctx/abi-inputs.ctx';
import { Navigation } from './navigation';
import { useToggle } from 'react-use';
import Button from '@mui/material/Button';

interface IProps {
  inputs: AbiInput[];
  /**
   * form name prefix
   */
  prefix: string;
}
export const AbiInputsComponentCore: React.FC<IProps> = ({ inputs, prefix }) => {
  const [Logger] = useLogger(AbiInputsComponentCore)
  const [navOpen, toggleNavOpen] = useToggle(true);

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
      <Box>
        header
        <Button onClick={toggleNavOpen}>nav</Button>
      </Box>
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <Box
          ref={(node) => ctx.setNavContainer(node as any as HTMLElement)}
          style={{
            maxHeight: '50vh',
            overflowY: 'scroll',
            width: navOpen ? '30%' : '0%',
            transition: 'all .1s linear',
          }}
        >
          <Navigation />
        </Box>
        <Box
          ref={(node) => ctx.setInputsContainer(node as any as HTMLElement)}
          style={{
            // minWidth: '70%',
            width: '100%',
            maxHeight: '50vh',
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
