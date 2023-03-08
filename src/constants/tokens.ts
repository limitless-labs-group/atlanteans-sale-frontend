import { MAINNET_CHAIN, SupportedChainId, TESTNET_CHAIN } from '@/constants'
import { Token } from '@/types'

export const WETH: { [chainId in SupportedChainId]: Token } = {
  [MAINNET_CHAIN?.id]: {
    address: '0x',
    symbol: 'wETH',
    decimals: 18,
    name: 'Wrapped Ether',
  },
  [TESTNET_CHAIN?.id]: {
    address: '0xb3C45Cfc3DB077E0EB9bC4565bAd16AAAe83b932',
    symbol: 'wETH',
    decimals: 18,
    name: 'Wrapped Ether (Testnet)',
  },
}
