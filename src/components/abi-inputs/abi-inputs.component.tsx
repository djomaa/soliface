import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useLogger } from 'hooks/use-logger';
import React, { useEffect } from 'react';

import { AbiInput } from 'types/abi';

import { AbiInputComponent } from './abi-input.component';
import { AbiInputsContainer } from './abi-inputs.container';
import { AbiInputsCtxProvider, useAbiInputsCtx } from './abi-inputs.ctx';

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

  const sidebar = (
    <List
      style={{
        position: 'sticky'
      }}>
      {[...ctx.map.entries()].map(([key, value], i) => {
        // const text = element.props.labels.join('.');
        return (
          <ListItemButton
            key={key}
            onClick={() => {
              console.log('click', value.current)
              value.current!.scrollIntoView({ block: 'nearest' });
              value.current!.focus();
              // return value.current!.focus();
            }}
          >
            {key}
          </ListItemButton>
        )
      })}
    </List>
  )

  return (
    <Box
      style={{
      }}
    >
      <Grid container>
        <Grid xs={4}
        // style={{
        //   position: 'sticky'
        // }}
        >
          <Box
            style={{
              maxHeight: '50vh',

              overflow: 'scroll',
            }}
          >
            {sidebar}
          </Box>
        </Grid>
        <Grid xs>
          <Box
            style={{
              maxHeight: '50vh',
              borderImage: 'linear-gradient(to right, white, black, white) 10%',
              borderTop: '1px solid',
              borderBottom: '1px solid',
              overflow: 'scroll',
            }}
          >
            <AbiInputsContainer>
              {elements}
            </AbiInputsContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export const AbiInputsComponent: React.FC<IProps> = (props) => {
  return (
    <AbiInputsCtxProvider>
      <AbiInputsComponentCore {...props} />
    </AbiInputsCtxProvider>
  );
}
