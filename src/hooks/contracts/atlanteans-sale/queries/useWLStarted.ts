import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from 'wagmi'

export const useWLStarted = () => {
  const log = useLogger(useWLStarted.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery(['wl-started-query'], {
    queryFn: () => atlanteansSale.mintlistStarted(),
    onError: (error) => {
      log.error({ error })
    },
    onSuccess: (data) => {
      log.success({ data })
    },
  })

  return query
}
