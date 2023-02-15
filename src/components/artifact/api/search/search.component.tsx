import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { searchAbiItem } from './use-search-abi-item';
import { useSearch } from 'hooks/use-search';
import { AbiItem, StateMutabilityType } from 'types/abi';
import assert from 'assert';
import Autocomplete from '@mui/material/Autocomplete';

const MutabilityOptions: StateMutabilityType[] = ['nonpayable', 'payable', 'pure', 'view']

interface IProps {
  abi: AbiItem[];
  setFunctions: React.Dispatch<React.SetStateAction<AbiItem[]>>;
}
export const Search: React.FC<IProps> = ({ abi, setFunctions }) => {
  const list = React.useMemo(() => {
    return abi.filter(({ type }) => type === 'function');
  }, [abi]);

  const [mutability, setMutability] = React.useState('');

  const [search, setSearch, searchList] = useSearch(list, searchAbiItem);

  React.useEffect(() => {
    let result = searchList;
    if (mutability) {
      result = searchList.filter((item) => {
        assert(item.stateMutability);
        return mutability.includes(item.stateMutability);
      });
    }
    setFunctions(result);
  }, [mutability, searchList, setFunctions]);

  return (
    <Grid container spacing={1}>
      <Grid xs={12} md={9}>
        <TextField
          fullWidth
          label='Search functions'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search functions by name'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid xs={12} md={3}>
        {/* <Select

        /> */}
        <Autocomplete
          // multiple
          id="tags-standard"
          options={MutabilityOptions}
          onInputChange={(_, value) => {
            setMutability(value)
          }}
          // getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Multiple values"
              placeholder="All"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
