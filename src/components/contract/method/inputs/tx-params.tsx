import { Link, Stack } from '@mui/material';
import { useChainCtx } from 'contexts/web3';
import React, { useEffect, useMemo, useState } from 'react';
import { AbiItem } from 'types/abi';
import { MethodInput } from './input';

enum TxArg {
  From = 'from',
  Value = 'value',
  Gas = 'gas',
  GasPrice = 'gasPrice',
  Nonce = 'nonce',
}

const TxArgType = {
  [TxArg.From]: 'address',
  [TxArg.Value]: 'uint256',
  [TxArg.Gas]: 'uint256',
  [TxArg.GasPrice]: 'uint256',
  [TxArg.Nonce]: 'uint256',
}

interface iProps {
  abi: AbiItem;
}

export const TxParams: React.FC<iProps> = ({ abi }) => {
  const alwaysOpenFields = useMemo(() => {
    return abi.stateMutability === 'payable' ? [TxArg.Value] : []
  }, [abi]);
  const chainCtx = useChainCtx();
  const [fields, setFields] = React.useState<TxArg[]>(alwaysOpenFields);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (open) {
      setFields([TxArg.From, TxArg.Value, TxArg.Gas, TxArg.GasPrice, TxArg.Nonce]);
    } else {
      setFields(alwaysOpenFields);
    }
  }, [open])

  const inputs = useMemo(() => {
    return fields.map((txArg) => {
      const defaultValue = txArg === TxArg.From && chainCtx.wallet ? chainCtx.account : undefined;
      return (
        // <>a</>
        <MethodInput
          key={txArg}
          name={txArg}
          position={['tx', txArg]}
          path={[txArg]}
          type={TxArgType[txArg]}
          defaultValue={defaultValue}
        />
      )
    });
  }, [fields]);

  const toggleButtonText = open ? 'Hide transaction parameters' : 'Show all transaction parameters'
  return (
    <>
      <Link
        variant='subtitle2'
        onClick={toggleOpen}
      >
        {toggleButtonText}
      </Link>
      <Stack>
        {inputs}
      </Stack>
    </>
  )
}
