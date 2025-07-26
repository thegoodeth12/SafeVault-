// hooks/useDarkMode.ts
import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [enabled])

  return { enabled, toggle: () => setEnabled((prev) => !prev) }
}
