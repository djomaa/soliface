import React from 'react'

export function parseError(error: Error) {
  if (error instanceof Error) {
    return {
      title: 'Unexpected error',
      body: <>{error.toString()} </>
    }
  } else {
    return {
      title: 'Unregonized error',
      body: <>Error is in the console</>
    }
  }
}
