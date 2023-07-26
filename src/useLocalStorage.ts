import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {

    const [value, setValue] = useState<T>(() => {
      const jsonVal = localStorage.getItem(key)
      if (jsonVal) return JSON.parse(jsonVal)
      if (typeof initialValue === 'function') return (initialValue as () => T)()
      return initialValue
    })

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [T, typeof setValue]
}
