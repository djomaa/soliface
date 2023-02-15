import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

interface IHandlerButton {
  name: string;
  disabled: boolean;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
}
export const HandlerButton: React.FC<IHandlerButton> = ({ name, onSubmit, disabled }) => {

  return (
    <Button
      disabled={disabled}
      onClick={onSubmit}
    >
      {name}
    </Button>
  )

}

export interface IHandler extends IHandlerButton {
  tooltip?: string;
}

export const Handler: React.FC<IHandler> = ({ tooltip, ...buttonProps }) => {

  const button = React.useMemo(() => {
    return <HandlerButton {...buttonProps} />
  }, [buttonProps]);

  if (!tooltip) {
    return button;
  }

  return (
    <Tooltip title={tooltip}>
      <span>
        {button}
      </span>
    </Tooltip>
  )

}

