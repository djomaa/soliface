import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { buildFunction } from 'helpers/abi/function';
import React from 'react'
import { AbiItem } from 'types/abi'
import { ArtifactCtxProvider, IArtifactCtxProps } from './ctx'
import { Function } from './function';
import { Search } from './search';

interface IProps extends IArtifactCtxProps {
  abi: AbiItem[];
}
const ArtifactApiCore: React.FC<IProps> = (props) => {
  const [functions, setFunctions] = React.useState(props.abi);

  const elements = React.useMemo(() => {
    // TODO: use full abi item key
    return functions.map((abi) => <Function key={buildFunction(abi)} abi={abi} />);
  }, [functions]);

  return (
    <Box>
      <Box mb={3}>
        <Search abi={props.abi} setFunctions={setFunctions} />
      </Box>
      {elements.length ? elements : (
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='center'
        >
          <Typography>
            No items found
          </Typography>
        </Box>
      )}
    </Box >
  )
}


export const ArtifactApi: React.FC<IProps> = (props) => {

  return (
    <ArtifactCtxProvider {...props}>
      <ArtifactApiCore {...props} />
    </ArtifactCtxProvider>
  )

}
