import { useNetwork } from '@/hooks'
import { SignerOrProvider } from '@/types'
import { useMemo } from 'react'
import { useProvider, useSigner } from 'wagmi'

export const useSignerOrProvider = () => {
  const { isActiveChainSupported, supportedChain } = useNetwork()
  const provider = useProvider({ chainId: supportedChain.id })
  const { data: signer } = useSigner()
  const signerOrProvider: SignerOrProvider = useMemo(
    () => (isActiveChainSupported && !!signer ? signer : provider),
    [isActiveChainSupported, signer, provider]
  )
  return signerOrProvider
}
