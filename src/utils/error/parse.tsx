import React from 'react'

/**
 * @deprecated use FormattedError instead ?
 */
export function parseError(error: unknown) {
  if (error instanceof Error) {
    return {
      title: 'Unexpected error',
      body: <>{error.toString()} </>
    }
  } if (error && typeof error === 'object' && 'message' in error && 'stack' in error) {
    return {
      title: error.message as string,
      body: <>{error.stack as string}</>,
    }
  } else {
    return {
      title: 'Unregonized error',
      body: <>Error is in the console</>
    }
  }
}
