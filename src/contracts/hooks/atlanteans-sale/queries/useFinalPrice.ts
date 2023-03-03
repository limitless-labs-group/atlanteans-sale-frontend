import { useAtlanteansSaleContract } from '@/contracts'
import { useLogger } from '@/hooks'
import { useQuery } from '@tanstack/react-query'

export const useFinalPrice = () => {
  const log = useLogger(useFinalPrice.name)
  const atlanteansSale = useAtlanteansSaleContract()

  return useQuery(['current-da-price'], async () => await atlanteansSale.finalPrice(), {
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
