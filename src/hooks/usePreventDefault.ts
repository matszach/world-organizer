import { useCallback } from 'react'

interface PreventDefaultEvent {
  preventDefault: () => void
}

function usePreventDefault<T extends PreventDefaultEvent>() {
  return useCallback((event: T) => {
    event.preventDefault()
  }, [])
}

export default usePreventDefault
