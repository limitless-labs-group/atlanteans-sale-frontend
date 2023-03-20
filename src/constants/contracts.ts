import { MAINNET_CHAIN, SupportedChainId, TESTNET_CHAIN } from '@/constants'
import { Address } from 'wagmi'

export const ATLANTEANS_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0x94ec741872023A451886de48E0Dee3BDD24e7FB1',
  [MAINNET_CHAIN?.id]: '0x',
}

export const ATLANTEANS_SALE_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0xaAf32340B7257947FE878f651D72aF34d953c0D6',
  [MAINNET_CHAIN?.id]: '0x',
}
