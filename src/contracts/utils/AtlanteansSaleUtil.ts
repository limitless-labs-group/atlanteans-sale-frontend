import { AtlanteansAPI } from '@/apis'
import {
  DEFAULT_CHAIN,
  SupportedChainId,
  MINT_GAS_LIMIT,
  SALE_PHASE,
  MINT_LIMIT_PER_TX,
} from '@/constants'
import {
  ATLANTEANS_SALE_CONTRACT_ADDRESS,
  AtlanteansSale__factory,
  AtlanteansSale,
} from '@/contracts'
import { Signer, SignerOrProvider } from '@/types'
import { getProvider } from '@wagmi/core'
import { ContractTransaction } from 'ethers'

interface IGetContract {
  signerOrProvider?: SignerOrProvider
  chainId?: number
}

export class AtlanteansSaleUtil {
  static getContract = ({ chainId: chainId_, signerOrProvider }: IGetContract): AtlanteansSale => {
    const chainId = chainId_ ?? DEFAULT_CHAIN.id
    const provider = getProvider({ chainId })
    const address = ATLANTEANS_SALE_CONTRACT_ADDRESS[chainId as SupportedChainId]
    const contract = AtlanteansSale__factory.connect(address, signerOrProvider ?? provider)
    return contract
  }

  // TODO: limit tokenAmount to 2 once mintlistMinted is adjusted
  static mintWL = async (
    signer: Signer,
    tokenAmount: number
  ): Promise<ContractTransaction | undefined> => {
    const maxTokenAmount = MINT_LIMIT_PER_TX[SALE_PHASE.WL]
    if (tokenAmount > Number(maxTokenAmount)) {
      return
    }

    const contract = this.getContract({ signerOrProvider: signer })

    const { message, digest } = await AtlanteansAPI.fetchMessageToSign(SALE_PHASE.WL)
    const signature = await signer.signMessage(message)
    const proof = await AtlanteansAPI.fetchProof(SALE_PHASE.WL, digest, signature)

    const tokenPrice = await contract.mintlistPrice()
    const totalPrice = tokenPrice.mul(tokenAmount)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['mintlistSummon(bytes32[])'](proof, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return tx
  }

  static mintDA = async (
    signer: Signer,
    tokenAmount: number
  ): Promise<ContractTransaction | undefined> => {
    const maxTokenAmount = MINT_LIMIT_PER_TX[SALE_PHASE.DA]
    if (tokenAmount > Number(maxTokenAmount)) {
      return
    }

    const contract = this.getContract({ signerOrProvider: signer })

    const tokenPrice = await contract.currentDaPrice()
    const totalPrice = tokenPrice.mul(tokenAmount)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['bidSummon(uint256)'](tokenAmount, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return tx
  }

  static mintPublic = async (
    signer: Signer,
    tokenAmount: number
  ): Promise<ContractTransaction | undefined> => {
    const maxTokenAmount = MINT_LIMIT_PER_TX[SALE_PHASE.PUBLIC]
    if (tokenAmount > Number(maxTokenAmount)) {
      return
    }

    const contract = this.getContract({ signerOrProvider: signer })

    const tokenPrice = await contract.finalPrice()
    const totalPrice = tokenPrice.mul(tokenAmount)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['publicSummon(uint256)'](tokenAmount, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return tx
  }

  static claim = async (signer: Signer): Promise<ContractTransaction> => {
    const contract = this.getContract({ signerOrProvider: signer })

    const { message, digest } = await AtlanteansAPI.fetchMessageToSign(SALE_PHASE.CLAIM)
    const signature = await signer.signMessage(message)
    const proof = await AtlanteansAPI.fetchProof(SALE_PHASE.CLAIM, digest, signature)

    const nonce = await signer.getTransactionCount()

    const tx = await contract.claimSummon(proof, {
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return tx
  }
}
