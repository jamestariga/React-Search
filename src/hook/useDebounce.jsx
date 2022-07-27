import { useState, useEffect } from 'react'

const useDebounce = (value, time = 250) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, time)

    return () => {
      clearTimeout(handler)
    }
  }, [value, time])

  return debouncedValue
}

export default useDebounce
