import { useAtlanteansSaleContract } from '@/contracts'
import { useLogger } from '@/hooks'
import { useQuery } from '@tanstack/react-query'

export const useCurrentDaPrice = (options?: { enabled: boolean }) => {
  const log = useLogger(useCurrentDaPrice.name)
  const atlanteansSale = useAtlanteansSaleContract()

  return useQuery(['current-da-price'], async () => await atlanteansSale.currentDaPrice(), {
    enabled: options?.enabled || true,
    cacheTime: 0,
    onError(error) {
      log.error({ error })
    },
    onSettled(data, error) {
      log.verbose('ON_SETTLED', { data, error })
    },
    onSuccess(data) {
      log.success({ data })
    },
  })
}
