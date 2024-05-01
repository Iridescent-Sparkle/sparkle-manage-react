import type { DependencyList } from 'react'
import { useEffect, useRef } from 'react'
import { isDeepEqualReact } from '../components/utils/isDeepEqualReact'

export const isDeepEqual = (a: any, b: any, ignoreKeys?: string[]) => isDeepEqualReact(a, b, ignoreKeys)

function useDeepCompareMemoize(value: any, ignoreKeys?: string[]) {
  const ref = useRef()
  if (!isDeepEqual(value, ref.current, ignoreKeys)) {
    ref.current = value
  }

  return ref.current
}

export function useDeepCompareEffect(effect: React.EffectCallback, dependencies: DependencyList, ignoreKeys?: string[]) {
  useEffect(effect, useDeepCompareMemoize(dependencies || [], ignoreKeys))
}
