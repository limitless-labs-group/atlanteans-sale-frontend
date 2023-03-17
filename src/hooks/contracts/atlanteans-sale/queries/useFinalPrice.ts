import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from 'wagmi'

export const useFinalPrice = () => {
  const log = useLogger(useFinalPrice.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery(['current-da-price-query'], {
    queryFn: () => atlanteansSale.finalPrice(),
    onError: (error) => {
      log.error({ error })
    },
    onSuccess: (data) => {
      log.success({ data })
    },
  })

  return query
}
