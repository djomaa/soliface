import React from 'react';

import Link from '@mui/material/Link';

export function createPositionRef(
  ref: React.RefObject<HTMLInputElement | null | undefined>,
  text: string
): string | JSX.Element {

  const RE = /position (\d+)/
  const match = text.match(RE)
  if (match == null) {
    return text
  }

  return (
    <div>
      {text.substring(0, match.index)}
      <Link onClick={() => {
        const position = Number(match[1])
        ref.current?.setSelectionRange(position, position)
        ref.current?.focus()
      }}>{match[0]}</Link>
      {text.substring(match.index! + match[0].length + 1)}
    </div>
  )

}
