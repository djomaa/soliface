import React from 'react';

import Chip from '@mui/material/Chip';

import { UseStateObject } from 'types/react';

interface IProps extends UseStateObject<'decimals', undefined | number> {

}

const DecimalsChipCore: React.FC<IProps> = ({ decimals, setDecimals }) => {
  if (decimals === undefined) {
    return (
      <Chip
        label='apply decimals'
        onClick={() => setDecimals(18)}
      />
    );
  }
  return (
    <Chip
      variant='outlined'
      onDelete={() => setDecimals(undefined)}
      label={(
        <>
          * 10
          <sup>
            <input
              style={{
                border: 0
              }}
              value={decimals}
              onChange={(e) => {
                const { value } = e.target;
                const newValue = value ? Number(value) : 0
                setDecimals(newValue)
              }}
              size={decimals.toString().length || 1}
              maxLength={2}
            />
          </sup>

        </>
      )}
    />
  );
}

// export const DecimalsChip = React.memo(DecimalsChipCore);
export const DecimalsChip = DecimalsChipCore;

// export const useDecimalsChip = (props: Props)
