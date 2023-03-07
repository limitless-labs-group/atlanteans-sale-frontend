import { MAINNET_CHAIN, SupportedChainId, TESTNET_CHAIN } from '@/constants'
import { Address } from 'wagmi'

export const ATLANTEANS_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0x4B028F5E138D2FDFB8A5F2a5a1fe643749Fbb3Df',
  [MAINNET_CHAIN?.id]: '0x',
}

export const ATLANTEANS_SALE_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0xe61347A7649D262b2Bcf60F10c956711D50C23Bb',
  [MAINNET_CHAIN?.id]: '0x',
}
