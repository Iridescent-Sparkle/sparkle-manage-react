/*
 * @Date: 2023-11-06 10:26:27
 * @Description: loading handle
 */
import { useState } from 'react'

const useLoadingHandle = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  const [loading, setLoading] = useState<boolean>(false)
  const handle = async (...args: any[]) => {
    try {
      if (!loading) {
        setLoading(true)
        return await fn(...args)
      }
    } catch (error) {
      console.error(`useLoadingHandle--${error}`)
    } finally {
      setLoading(false)
    }
  }
  return [loading, handle] as [boolean, T]
}

export default useLoadingHandle
