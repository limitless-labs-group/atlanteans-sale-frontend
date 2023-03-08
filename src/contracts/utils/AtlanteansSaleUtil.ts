import { AtlanteansAPI } from '@/apis'
import {
  DEFAULT_CHAIN,
  MINT_GAS_LIMIT,
  MINT_LIMIT_PER_TX,
  MINT_LIMIT_TOTAL,
  SupportedChainId,
  SalePhase,
} from '@/constants'
import {
  ATLANTEANS_SALE_CONTRACT_ADDRESS,
  AtlanteansSale__factory,
  AtlanteansSale,
} from '@/contracts'
import { Signer, SignerOrProvider, ContractTransaction } from '@/types'
import { getChain, getProvider } from '@/utils'

interface IAtlanteansSaleUtilGetContract {
  signerOrProvider?: SignerOrProvider
  chainId?: number
}

enum MintError {
  LIMIT_PER_TX = 'The maximum number of tokens to mint per single transaction is LIMIT_TO_REPLACE',
  LIMIT_TOTAL = 'The number of tokens you are trying to mint is over your limits. You can mint maximum LIMIT_TO_REPLACE',
  ALREADY_MINTED = 'You already minted the maximum number of tokens allowed',
}

type IAtlanteansSaleUtilMintResponse = Promise<{
  tx?: ContractTransaction
  error?: string
}>

export class AtlanteansSaleUtil {
  static getContract = ({
    chainId = DEFAULT_CHAIN.id,
    signerOrProvider,
  }: IAtlanteansSaleUtilGetContract): AtlanteansSale => {
    const chain = getChain(chainId)
    const provider = getProvider({ chain })
    const address = ATLANTEANS_SALE_CONTRACT_ADDRESS[chainId as SupportedChainId]
    const contract = AtlanteansSale__factory.connect(address, signerOrProvider ?? provider)
    return contract
  }

  static mintWL = async (signer: Signer, tokenAmount: number): IAtlanteansSaleUtilMintResponse => {
    const contract = this.getContract({ signerOrProvider: signer })
    const address = await signer.getAddress()

    // verify if not over limits
    const tokenAmountMinted = (await contract.mintlistMinted(address)).toNumber()
    const tokenAmountLeft = MINT_LIMIT_TOTAL[SalePhase.WL] - tokenAmountMinted
    const maxTokenAmountPerTx = MINT_LIMIT_PER_TX[SalePhase.WL]
    if (tokenAmountLeft <= 0) {
      return {
        error: MintError.ALREADY_MINTED,
      }
    }
    if (tokenAmount > tokenAmountLeft) {
      return {
        error: MintError.LIMIT_TOTAL.replace('LIMIT_TO_REPLACE', tokenAmountLeft.toString()),
      }
    }
    if (tokenAmount > maxTokenAmountPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxTokenAmountPerTx.toString()),
      }
    }

    // getting merkle proof
    const { message, hash } = await AtlanteansAPI.fetchMessageToSign(SalePhase.WL)
    const signature = await signer.signMessage(message)
    const proof = await AtlanteansAPI.fetchProof(SalePhase.WL, hash, signature)

    // calculating ethers to send
    const tokenPrice = await contract.mintlistPrice()
    const totalPrice = tokenPrice.mul(tokenAmount)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['mintlistSummon(bytes32[])'](proof, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }

  static mintDA = async (signer: Signer, tokenAmount: number): IAtlanteansSaleUtilMintResponse => {
    // verify if not over limits
    const maxTokenAmountPerTx = MINT_LIMIT_PER_TX[SalePhase.DA]
    if (tokenAmount > maxTokenAmountPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxTokenAmountPerTx.toString()),
      }
    }

    const contract = this.getContract({ signerOrProvider: signer })

    // calculating ethers to send
    const tokenPrice = await contract.currentDaPrice()
    const totalPrice = tokenPrice.mul(tokenAmount)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['bidSummon(uint256)'](tokenAmount, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }

  static mintPublic = async (
    signer: Signer,
    tokenAmount: number
  ): IAtlanteansSaleUtilMintResponse => {
    // verify if not over limits
    const maxTokenAmountPerTx = MINT_LIMIT_PER_TX[SalePhase.PUBLIC]
    if (tokenAmount > maxTokenAmountPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxTokenAmountPerTx.toString()),
      }
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

    return { tx }
  }

  static claim = async (signer: Signer): IAtlanteansSaleUtilMintResponse => {
    const contract = this.getContract({ signerOrProvider: signer })
    const address = await signer.getAddress()

    const hasClaimed = await contract.claimlistMinted(address)
    if (hasClaimed) {
      return {
        error: MintError.ALREADY_MINTED,
      }
    }

    const { message, hash } = await AtlanteansAPI.fetchMessageToSign(SalePhase.CLAIM)
    const signature = await signer.signMessage(message)
    const proof = await AtlanteansAPI.fetchProof(SalePhase.CLAIM, hash, signature)

    const nonce = await signer.getTransactionCount()

    const tx = await contract.claimSummon(proof, {
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }
}
