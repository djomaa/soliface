import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSearch } from 'hooks/use-search';
import React from 'react'
import { AbiItem } from 'types/abi'
import { ArtifactCtxProvider, IArtifactCtxProps } from './ctx'
import { Function } from './function';
import { searchAbiItem } from './use-search-abi-item';

interface IProps extends IArtifactCtxProps {
  abi: AbiItem[];
}
const ArtifactApiCore: React.FC<IProps> = (props) => {
  const list = React.useMemo(() => {
    return props.abi.filter((abi) => abi.type === 'function');
  }, [props.abi]);

  const [search, setSearch, searchList] = useSearch(list, searchAbiItem);

  const functions = React.useMemo(() => {
    return searchList
      .map((abi, i) => {
        // TODO: set normal key
        return <Function key={i} abi={abi} />
      })
  }, [searchList]);

  return (
    <Box>
      <Box mb={3}>
        <TextField
          fullWidth
          label='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by name or state mutability'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      {functions.length ? functions : (
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <Typography>
            No items found
          </Typography>
        </Box>
      )
      }
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
