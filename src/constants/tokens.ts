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
    address: '0x9441116d3E597533c5337303ba74E4559dB8A398',
    symbol: 'wETH',
    decimals: 18,
    name: 'Wrapped Ether (Testnet)',
  },
}
