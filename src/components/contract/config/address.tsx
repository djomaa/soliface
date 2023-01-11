import React, { useState } from 'react';

import TextField from '@mui/material/TextField';

import { useContractCtx } from 'contexts/contract';
import { addressValidator } from 'helpers/validators';

export const AddressInput: React.FC = () => {
  const ctx = useContractCtx();

  const [address, setAddress] = useState(ctx.address ?? '');
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (addressValidator(value)) {
      setError(undefined);
      ctx.setAddress(value);
    } else {
      setError('Invalid address');
    }
  }

  const errD = !focus && error
  return (
    <TextField
      fullWidth
      label='Contract'
      margin='dense'
      value={address}
      onChange={(e) => handleAddressChange(e.target.value)}
      onBlur={() => setTouched(true)}
      error={touched ? !!error : false}
      helperText={touched ? error : undefined}
    />
  );
}
