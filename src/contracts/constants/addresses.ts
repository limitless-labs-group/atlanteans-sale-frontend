import { MAINNET_CHAIN, TESTNET_CHAIN } from '@/constants'
import { Address } from 'wagmi'

export const ATLANTEANS_CONTRACT_ADDRESS: { [chainId: number]: Address } = {
  [TESTNET_CHAIN.id]: '0x',
  [MAINNET_CHAIN.id]: '0x',
}

export const ATLANTEANS_SALE_CONTRACT_ADDRESS: { [chainId: number]: Address } = {
  [TESTNET_CHAIN.id]: '0x',
  [MAINNET_CHAIN.id]: '0x',
}
