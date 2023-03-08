import { AtlanteansUtil } from '@/contracts'
import { useNetwork, useSignerOrProvider } from '@/hooks'
import { useMemo } from 'react'

export const useAtlanteansContract = () => {
  const { supportedChain } = useNetwork()
  const signerOrProvider = useSignerOrProvider()
  const atlanteansContract = useMemo(
    () => AtlanteansUtil.getContract({ chainId: supportedChain.id, signerOrProvider }),
    [supportedChain, signerOrProvider]
  )
  return atlanteansContract
}
