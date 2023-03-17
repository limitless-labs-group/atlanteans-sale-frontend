import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from 'wagmi'

export const useCurrentDAPrice = () => {
  const log = useLogger(useCurrentDAPrice.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery(['current-da-price-query'], {
    queryFn: () => atlanteansSale.currentDaPrice(),
    onError: (error) => {
      log.error({ error })
    },
    onSuccess: (data) => {
      log.success({ data })
    },
  })

  return query
}
