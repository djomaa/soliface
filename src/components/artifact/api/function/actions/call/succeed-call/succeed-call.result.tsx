import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import React from 'react';
import { useToggle } from 'react-use';
import { AbiItem } from 'types/abi'
import Web3 from 'web3';
import { MethodDecodedResult } from './decoded.result-content';
import { RawResultContent } from './raw.result-content';

enum Mode {
  Raw,
  Decoded,
}

interface IProps {
  abi: AbiItem;
  result: string;
  web3: Web3;
}
export const SucceedCallContentResult: React.FC<IProps> = ({ result, ...props }) => {
  const [isDecoded, toggleIsDecoded] = useToggle(true);

  const content = React.useMemo(() => {
    if (!isDecoded) {
      return <RawResultContent result={result} />
    }
    return (
      <MethodDecodedResult
        abi={props.abi}
        raw={result}
        web3={props.web3}
      />
    )
  }, [result, isDecoded])

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography>Raw</Typography>
        <Switch
          checked={isDecoded}
          onChange={toggleIsDecoded}
        />
        <Typography>Decoded</Typography>
      </Stack>
      {content}
    </>
  )
}
