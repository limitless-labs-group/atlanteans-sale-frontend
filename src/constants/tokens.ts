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
    address: '0x4B028F5E138D2FDFB8A5F2a5a1fe643749Fbb3Df',
    symbol: 'wETH',
    decimals: 18,
    name: 'Wrapped Ether (Testnet)',
  },
}
