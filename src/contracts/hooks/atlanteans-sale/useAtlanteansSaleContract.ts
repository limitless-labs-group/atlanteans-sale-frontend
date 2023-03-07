import { AtlanteansSaleUtil } from '@/contracts'
import { useSignerOrProvider } from '@/hooks'
import { useMemo } from 'react'

export const useAtlanteansSaleContract = () => {
  const signerOrProvider = useSignerOrProvider()
  const atlanteansSaleContract = useMemo(
    () => AtlanteansSaleUtil.getContract({ signerOrProvider }),
    [signerOrProvider]
  )
  return atlanteansSaleContract
}
