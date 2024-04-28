import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import isEqual from 'lodash/isEqual'

const usePolling = <T>(cb: () => T | Promise<T>, intervalInMs?: number) => {
  const cbRef = useRef<() => T | Promise<T>>(cb)
  const intervalRef = useRef<number>(intervalInMs || 2500)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [lastResult, setLastResult] = useState<T>()
  const lastResultRef = useRef<T>()

  useEffect(() => {
    cbRef.current = cb
    intervalRef.current = intervalInMs || 2000
  }, [cb, intervalInMs])

  useEffect(() => {
    const next = () => {
      new Promise<void>((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          const value = await cbRef.current()
          if (!isEqual(lastResultRef.current, value)) {
            lastResultRef.current = value
            setLastResult(value)
          }

          next()
          resolve()
        }, intervalRef.current)
      })
    }

    next()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return useMemo(() => ({ result: lastResult, stop }), [lastResult, stop])
}

export default usePolling
