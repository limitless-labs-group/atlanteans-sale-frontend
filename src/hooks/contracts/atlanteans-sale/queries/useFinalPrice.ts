import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from '@tanstack/react-query'

export const useFinalPrice = () => {
  const log = useLogger(useFinalPrice.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery({
    queryKey: ['current-da-price-query'],
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
