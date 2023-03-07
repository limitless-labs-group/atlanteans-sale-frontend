import { providers, Signer } from 'ethers'
import { Address } from 'wagmi'

export { Signer }

export type SignerOrProvider = Signer | providers.BaseProvider

export type MerkleProof = string[]

export interface Token {
  address: Address
  symbol: string
  decimals: number
  name?: string
  logoURI?: string
}
