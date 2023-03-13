import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { useQuery } from '@tanstack/react-query'

export const useDAStarted = () => {
  const log = useLogger(useDAStarted.name)
  const atlanteansSale = useAtlanteansSaleContract()

  const query = useQuery({
    queryKey: ['da-started-query'],
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
