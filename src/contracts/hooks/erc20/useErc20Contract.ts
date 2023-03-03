import { Erc20Util } from '@/contracts'
import { useSignerOrProvider } from '@/hooks'
import { useMemo } from 'react'

export const useErc20Contract = (address: string) => {
  const signerOrProvider = useSignerOrProvider()
  const erc20Contract = useMemo(
    () => Erc20Util.getContract(address, signerOrProvider),
    [address, signerOrProvider]
  )
  return erc20Contract
}
