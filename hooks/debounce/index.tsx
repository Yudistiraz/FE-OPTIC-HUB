import { useRef, useState, useEffect } from 'react'

const useDebounce = (value: string, delay = 500, callback = () => {}) => {
  const [debounceValue, setDebounceValue] = useState(value)
  const previousValue = useRef(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (previousValue.current !== value) {
        setDebounceValue(value)
        previousValue.current = value

        callback()
      }
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, callback])

  return debounceValue
}

export default useDebounce
