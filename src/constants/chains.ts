import { Chain } from '@/types'

export const TESTNET_CHAIN: Chain = Object.freeze({
  id: 80001,
  name: 'Polygon Mumbai',
  network: 'maticmum',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://matic-mumbai.chainstacklabs.com'],
    },
    public: {
      http: ['https://matic-mumbai.chainstacklabs.com'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
  testnet: true,
})
export const MAINNET_CHAIN: Chain = Object.freeze({
  id: 1,
  network: 'homestead',
  name: 'Ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_RPC_URL ?? 'https://cloudflare-eth.com'],
    },
    public: {
      http: ['https://cloudflare-eth.com'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
})
export const DEFAULT_CHAIN: Chain =
  process.env.NEXT_PUBLIC_TESTNET_MODE === 'true' ? TESTNET_CHAIN : MAINNET_CHAIN

export const SUPPORTED_CHAINS: Chain[] = [MAINNET_CHAIN, TESTNET_CHAIN]

export type SupportedChainId = typeof MAINNET_CHAIN.id | typeof TESTNET_CHAIN.id
