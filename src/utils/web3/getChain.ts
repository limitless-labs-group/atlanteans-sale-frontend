import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from '@/constants'

export const getChain = (chainId?: number) =>
  SUPPORTED_CHAINS.find((chain) => chain.id === chainId) ?? DEFAULT_CHAIN
