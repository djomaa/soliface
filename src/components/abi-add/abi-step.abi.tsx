import Link from '@mui/material/Link';
import React from 'react';
import { SafeError } from 'types/common';

interface IProps {
  error: SafeError;
  abiInputRef: React.RefObject<HTMLInputElement | null>;
}
export const formatAbiError = ({ error, abiInputRef }: IProps): string | JSX.Element | undefined => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (!error?.details) {
    return
  }
  const RE = /position (\d+)/
  const match = error.details.match(RE)
  if (match == null) {
    return error.details
  }

  return (
    <div>
      {error.details.substring(0, match.index)}
      <Link onClick={() => {
        const position = Number(match[1])
        console.log('CLIIICK', { a: abiInputRef, position });
        abiInputRef.current?.setSelectionRange(position, position)
        abiInputRef.current?.focus()
      }}>{match[0]}</Link>
      {error.details.substring(match.index! + match[0].length + 1)}
    </div>
  )

}
