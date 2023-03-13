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
    address: '0xF7C852175fCB4Ef2a33B9481151aCD5B9411A16F',
    symbol: 'wETH',
    decimals: 18,
    name: 'Wrapped Ether (Testnet)',
  },
}
