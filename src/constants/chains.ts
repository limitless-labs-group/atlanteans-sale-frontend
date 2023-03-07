import { mainnet, polygonMumbai } from 'wagmi/chains'

export const TESTNET_CHAIN = polygonMumbai
export const MAINNET_CHAIN = mainnet
export const DEFAULT_CHAIN =
  process.env.NEXT_PUBLIC_TESTNET_MODE === 'true' ? TESTNET_CHAIN : MAINNET_CHAIN

export const SUPPORTED_CHAINS = [MAINNET_CHAIN, TESTNET_CHAIN]

export type SupportedChainId = typeof MAINNET_CHAIN.id | typeof TESTNET_CHAIN.id
