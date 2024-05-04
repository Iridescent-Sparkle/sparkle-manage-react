import { useCallback, useState } from 'react'
import { isFunction } from '../components/utils/is'

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void

function useSetState<S extends Record<string, any>>(initialState: S | (() => S)): [S, SetState<S>] {
  const [state, setState] = useState<S>(initialState)

  const setMergeState = useCallback((patch: unknown) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch
      return newState ? { ...prevState, ...newState } : prevState
    })
  }, [])

  return [state, setMergeState]
}

export default useSetState
