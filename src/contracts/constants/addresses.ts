import { MAINNET_CHAIN, SupportedChainId, TESTNET_CHAIN } from '@/constants'
import { Address } from 'wagmi'

export const ATLANTEANS_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0xE6a3f6E572363C963Df6EE0D341F6C86d9d40017',
  [MAINNET_CHAIN?.id]: '0x',
}

export const ATLANTEANS_SALE_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0x100F30d0dBA80b6f3af9401c96a7a30895726C5e',
  [MAINNET_CHAIN?.id]: '0x',
}
