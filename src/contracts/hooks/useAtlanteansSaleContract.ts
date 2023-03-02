import { AtlanteansSaleUtil } from '@/contracts'
import { useNetwork, useSignerOrProvider } from '@/hooks'
import { useMemo } from 'react'

export const useAtlanteansSaleContract = () => {
  const { supportedChain } = useNetwork()
  const signerOrProvider = useSignerOrProvider()
  const atlanteansSaleContract = useMemo(
    () => AtlanteansSaleUtil.getContract(supportedChain.id, signerOrProvider),
    [supportedChain, signerOrProvider]
  )
  return atlanteansSaleContract
}
