import qs from 'qs'
import { useUrlSearchParams } from '@vueuse/core/index.cjs'

export function useSearchParams<T extends Record<string, any>>(): T {
  const params = useUrlSearchParams<T>()
  return qs.parse(params) as T
}
