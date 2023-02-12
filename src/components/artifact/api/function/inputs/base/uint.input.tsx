import { Chip, InputAdornment } from '@mui/material';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';
import { useToggle } from 'react-use';

interface IProps {
  size: number | undefined;
  fieldProps: TextFieldElementProps<any>,
}
export const UintInput: React.FC<IProps> = ({ size, fieldProps }) => {
  const [decimalsEnabled, toggleDecimalsEnabled] = useToggle(false);
  const [decimals, setDecimals] = React.useState('');

  const f = useFormContext();
  const a = useController({ name: 'a', control: f.control })

  const chip = React.useMemo(() => {
    if (!decimalsEnabled) {
      return (
        <Chip
          label='apply decimals'
          onClick={toggleDecimalsEnabled}
        />
      )
    }
    return (
      <Chip
        variant='outlined'
        onDelete={toggleDecimalsEnabled}
        label={(
          <>
            * 10
            <sup>
              <input
                style={{
                  border: 0
                }}
                value={decimals}
                onChange={(e) => { setDecimals(e.target.value) }}
                size={decimals.length || 1}
                maxLength={2}
              />
            </sup>

          </>
        )}
      />
    )
  }, [decimals, decimalsEnabled]);

  // return (
  //   <TextFieldElement

  //   />
  // )

  return (
    <TextFieldElement
      {...fieldProps}
      // onChange={(e) => {
      //   f.setValue(e.)
      // }}
      placeholder='uint'
      InputProps={{
        // startAdornment: <InputAdornment position='start'>{chip}</InputAdornment>,
        endAdornment: <InputAdornment position='end'>{chip} <Chip label='uint' /></InputAdornment>
      }}
      helperText='apply decimals'
    />
  )
}

export const UintInputRE = /uint(\d*)/;
