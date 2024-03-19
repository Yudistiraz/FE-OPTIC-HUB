import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { buildQueryString, parseQueryString } from '@/utils/functions'

export default function useQueryParams<T>() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function setQueryParams(params: Partial<T>) {
    // Call buildQueryString to construct the query string
    const queryString = buildQueryString(params)

    // Replace the query part of the URL
    router.replace(`${pathname}${queryString}`)
  }

  function parseQueryParams(params: string) {
    /**
     * return example:
     *  {
     *    foo: ['bar1', 'bar2'],
     *    foo_1: ['bar3'],
     *  }
     */
    return parseQueryString(params)
  }

  return { queryParams: searchParams, setQueryParams, parseQueryParams }
}
