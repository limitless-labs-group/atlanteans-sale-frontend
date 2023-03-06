import { providers, Signer } from 'ethers'

export type SignerOrProvider = Signer | providers.BaseProvider

export type MerkleProof = string[]
