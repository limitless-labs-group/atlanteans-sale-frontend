import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from '@tanstack/react-query'

export const useCurrentDAPrice = () => {
  const log = useLogger(useCurrentDAPrice.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery({
    queryKey: ['current-da-price-query'],
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
