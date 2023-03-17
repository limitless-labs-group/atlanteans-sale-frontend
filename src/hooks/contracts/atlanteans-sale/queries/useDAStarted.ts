import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from 'wagmi'

export const useDAStarted = () => {
  const log = useLogger(useDAStarted.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery(['da-started-query'], {
    queryFn: () => atlanteansSale.daStarted(),
    onError: (error) => {
      log.error({ error })
    },
    onSuccess: (data) => {
      log.success({ data })
    },
  })

  return query
}
