import { optimism, goerli } from 'wagmi/chains'

export const TESTNET_CHAIN = goerli
export const MAINNET_CHAIN = optimism
export const DEFAULT_CHAIN = MAINNET_CHAIN

export const SUPPORTED_CHAINS = [MAINNET_CHAIN, TESTNET_CHAIN]
