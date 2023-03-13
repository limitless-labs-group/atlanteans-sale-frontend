import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from '@tanstack/react-query'

export const useClaimStarted = () => {
  const log = useLogger(useClaimStarted.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery({
    queryKey: ['claim-started-query'],
    queryFn: () => atlanteansSale.claimsStarted(),
    onError: (error) => {
      log.error({ error })
    },
    onSuccess: (data) => {
      log.success({ data })
    },
  })

  return query
}
