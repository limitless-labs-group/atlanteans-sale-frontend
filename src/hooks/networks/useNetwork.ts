import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from '@/constants'
import { useMemo } from 'react'
import { Chain, useNetwork as useWagmiNetwork } from 'wagmi'

export const useNetwork = () => {
  const { chain: activeChain } = useWagmiNetwork()
  const isActiveChainSupported: boolean = useMemo(
    () => SUPPORTED_CHAINS.some((chain) => chain.id === activeChain?.id),
    [activeChain, SUPPORTED_CHAINS]
  )
  const supportedChain: Chain = useMemo(
    () => (!!activeChain && isActiveChainSupported ? activeChain : DEFAULT_CHAIN),
    [isActiveChainSupported, DEFAULT_CHAIN]
  )
  return { activeChain, isActiveChainSupported, supportedChain } as const
}
