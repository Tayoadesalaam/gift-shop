import { useEffect, useState } from "react"

export function useSessionStorageState<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = sessionStorage.getItem(key)
      if (!storedValue) {
        return initialValue
      }

      const parsedValue = JSON.parse(storedValue) as T
      return typeof parsedValue === "object" && parsedValue !== null
        ? ({ ...initialValue, ...parsedValue } as T)
        : parsedValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Ignore storage issues in restricted environments.
    }
  }, [key, state])

  return [state, setState]
}
