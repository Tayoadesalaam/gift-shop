import { useMemo } from "react"

export function useFilteredList<T>(
  items: T[],
  query: string,
  getSearchText: (item: T) => string,
) {
  return useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return items
    }

    return items.filter((item) =>
      getSearchText(item).toLowerCase().includes(term),
    )
  }, [getSearchText, items, query])
}
