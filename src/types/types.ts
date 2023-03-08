import { providers, Signer, Bytes, BigNumber, ContractTransaction } from 'ethers'

export { Signer, BigNumber }
export type { Bytes, ContractTransaction }

export type SignerOrProvider = Signer | providers.BaseProvider

export type MerkleProof = string[]

export type Address = `0x${string}`

export interface Token {
  address: Address
  symbol: string
  decimals: number
  name?: string
  logoURI?: string
}

export interface Chain {
  id: number
  network: string
  name: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: {
    alchemy?: {
      http: string[]
      webSocket?: string[]
    }
    infura?: {
      http: string[]
      webSocket?: string[]
    }
    default: {
      http: string[]
      webSocket?: string[]
    }
    public: {
      http: string[]
      webSocket?: string[]
    }
  }
  blockExplorers: {
    etherscan?: {
      name: string
      url: string
    }
    default: {
      name: string
      url: string
    }
  }
}
