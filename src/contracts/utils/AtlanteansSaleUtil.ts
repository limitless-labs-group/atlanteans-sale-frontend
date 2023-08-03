import {
  MINT_GAS_LIMIT,
  MINT_LIMIT_PER_TX,
  MINT_LIMIT_TOTAL,
  SupportedChainId,
  SalePhase,
  DEFAULT_CHAIN,
  ATLANTEANS_SALE_CONTRACT_ADDRESS,
} from '@/constants'
import { AtlanteansSale__factory, AtlanteansSale } from '@/contracts/types'
import { Signer, SignerOrProvider, ContractTransaction, MerkleProof } from '@/types'
import { getChain, getProvider } from '@/utils'
import { constants } from 'ethers'

interface IAtlanteansSaleUtilGetContract {
  signerOrProvider?: SignerOrProvider
  chainId?: number
}

type IAtlanteansSaleUtilMintResponse = Promise<{
  tx?: ContractTransaction
  error?: string
}>

export enum MintError {
  LIMIT_PER_TX = 'The maximum number of tokens to mint per single transaction is LIMIT_TO_REPLACE',
  LIMIT_TOTAL = 'The number of tokens you are trying to mint is over your limits. You can mint maximum LIMIT_TO_REPLACE',
  ALREADY_MINTED = 'You already minted the maximum number of tokens allowed',
  PHASE_ENDED = 'The sale phase has not started',
  PHASE_NOT_STARTED = 'The sale phase has already ended',
}

interface IAtlanteansSaleUtilMint {
  address?: string
  chainId?: number
  signer: Signer
  quantity: number
}
interface IAtlanteansSaleUtilMintWithProof extends IAtlanteansSaleUtilMint {
  proof: MerkleProof
}
interface IAtlanteansSaleUtilMintWithSignature extends IAtlanteansSaleUtilMint {
  signature: string
  scrollsAmount: number
}

export class AtlanteansSaleUtil {
  /**
   * Init sale contract instance with chain and signer or provider connected.
   * @param chainId (optional) chain id for provider and contract address. Uses {@link DEFAULT_CHAIN} if undefined.
   * @param signerOrProvider (optinal) user's {@link Signer} or custom {@link SignerOrProvider}. Uses default provider if undefined.
   * @returns instance of {@link AtlanteansSale} contract with {@link SignerOrProvider} connected.
   */
  static getContract = ({
    chainId,
    signerOrProvider,
  }: IAtlanteansSaleUtilGetContract): AtlanteansSale => {
    const chain = getChain(chainId)
    const provider = getProvider({ chain })
    const address = ATLANTEANS_SALE_CONTRACT_ADDRESS[chain.id as SupportedChainId]
    const contract = AtlanteansSale__factory.connect(address, signerOrProvider ?? provider)
    return contract
  }

  static currentSalePhase = async (chainId = DEFAULT_CHAIN.id): Promise<SalePhase | undefined> => {
    const contract = this.getContract({ chainId })
    const [mintlistStarted, daStarted, publicStarted, publicEnded, claimsStarted, claimsEnded] =
      await Promise.all([
        contract.mintlistStarted(),
        contract.daStarted(), //mintlistEnded
        contract.publicStarted(), // daEnded
        contract.publicEnded(),
        contract.claimsStarted(), // daEnded
        contract.claimsEnded(),
      ])
    if (publicEnded && claimsEnded) {
      return undefined
    }
    if (publicStarted || claimsStarted) {
      // ? start at the same time
      return SalePhase.PUBLIC
      return SalePhase.CLAIM
    }
    if (daStarted) {
      return SalePhase.DA
    }
    if (mintlistStarted) {
      return SalePhase.WL
    }
  }

  // static hasClaimed = async (address: string, chainId = DEFAULT_CHAIN.id): Promise<boolean> => {
  //   const contract = this.getContract({ chainId })
  //   const _hasClaimed = await contract.claimlistMinted(address)
  //   return _hasClaimed
  // }

  static wlMintedAmount = async (address: string, chainId = DEFAULT_CHAIN.id): Promise<number> => {
    const contract = this.getContract({ chainId })
    const _wlMintedAmount = (await contract.mintlistMinted(address)).toNumber()
    return _wlMintedAmount
  }

  /**
   * minting methods
   */
  static mintWL = async ({
    signer,
    proof,
    quantity = 1,
  }: IAtlanteansSaleUtilMintWithProof): IAtlanteansSaleUtilMintResponse => {
    const address = await signer.getAddress()
    const chainId = await signer.getChainId()
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

    const quantityMinted = await this.wlMintedAmount(address, chainId)
    const quantityRemaining = MINT_LIMIT_TOTAL[SalePhase.WL] - quantityMinted
    const maxQuantityPerTx = MINT_LIMIT_PER_TX[SalePhase.WL]
    if (quantityRemaining <= 0) {
      return {
        error: MintError.ALREADY_MINTED,
      }
    }
    if (quantity > quantityRemaining) {
      return {
        error: MintError.LIMIT_TOTAL.replace('LIMIT_TO_REPLACE', quantityRemaining.toString()),
      }
    }
    if (quantity > maxQuantityPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxQuantityPerTx.toString()),
      }
    }

    const tokenPrice = await contract.mintlistPrice()
    const totalPrice = tokenPrice.mul(quantity)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['mintlistSummon(bytes32[])'](proof, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }

  static mintDA = async ({
    signer,
    quantity = 1,
  }: IAtlanteansSaleUtilMint): IAtlanteansSaleUtilMintResponse => {
    const maxQuantityPerTx = MINT_LIMIT_PER_TX[SalePhase.DA]
    if (quantity > maxQuantityPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxQuantityPerTx.toString()),
      }
    }

    const chainId = await signer.getChainId()
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

    const tokenPrice = await contract.currentDaPrice()
    const totalPrice = tokenPrice.mul(quantity)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['bidSummon(uint256)'](quantity, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }

  static mintPublic = async ({
    signer,
    quantity = 1,
  }: IAtlanteansSaleUtilMint): IAtlanteansSaleUtilMintResponse => {
    const maxQuantityPerTx = MINT_LIMIT_PER_TX[SalePhase.PUBLIC]
    if (quantity > maxQuantityPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxQuantityPerTx.toString()),
      }
    }

    const chainId = await signer.getChainId()
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

    const tokenPrice = await contract.lastPrice()
    const totalPrice = tokenPrice.mul(quantity)

    const nonce = await signer.getTransactionCount()

    const tx = await contract['publicSummon(uint256)'](quantity, {
      value: totalPrice,
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }

  static claim = async ({
    address,
    chainId,
    signer,
    quantity,
    scrollsAmount,
    signature,
  }: IAtlanteansSaleUtilMintWithSignature): IAtlanteansSaleUtilMintResponse => {
    // const [address, chainId] = await Promise.all([signer.getAddress(), signer.getChainId()])
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

    const [hasClaimStarted, hasClaimEnded, quantityRemaining, faRegistered] = await Promise.all([
      contract.claimsStarted(),
      contract.claimsEnded(),
      contract.faToRemainingClaim(address ?? constants.AddressZero),
      contract.faRegistered(address ?? constants.AddressZero),
    ])

    if (hasClaimEnded) {
      return {
        error: MintError.PHASE_ENDED,
      }
    }
    if (!hasClaimStarted) {
      return {
        error: MintError.PHASE_NOT_STARTED,
      }
    }
    if (faRegistered && quantityRemaining.lte(0)) {
      return {
        error: MintError.ALREADY_MINTED,
      }
    }
    if (faRegistered && quantityRemaining.lt(quantity)) {
      return {
        error: MintError.LIMIT_TOTAL.replace('LIMIT_TO_REPLACE', quantityRemaining.toString()),
      }
    }

    const nonce = await signer.getTransactionCount()

    const tx = await contract.claimSummon(signature, scrollsAmount, quantity, {
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }
}
