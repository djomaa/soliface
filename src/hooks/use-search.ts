import { useDeferredValue, useMemo, useState } from 'react'

import { useLogger } from './use-logger'

interface IOpts {
  debounceMs?: number
}

type SearchFn<T> = (list: T[], query: string) => T[]
export const useSearch = <T>(list: T[], searchFn: SearchFn<T>, opts?: IOpts) => {
  const [Logger] = useLogger(useSearch.name, searchFn.name)
  const [search, setSearch] = useState('')
  // const [debouncedSearch] = useDebounce(search, opts?.debounceMs ?? 350)
  const debouncedSearch = useDeferredValue(search)


  const filtered = useMemo(() => {
    Logger.debug('Searching', { query: debouncedSearch, list })
    const result = searchFn(list, debouncedSearch)
    Logger.debug('Searched', { query: debouncedSearch, result })
    return result
  }, [debouncedSearch, list, searchFn])

  return [search, setSearch, filtered] as const
}
