import {
  MINT_GAS_LIMIT,
  MINT_LIMIT_PER_TX,
  MINT_LIMIT_TOTAL,
  SupportedChainId,
  SalePhase,
  DEFAULT_CHAIN,
} from '@/constants'
import { ATLANTEANS_SALE_CONTRACT_ADDRESS } from '@/contracts/constants'
import { AtlanteansSale__factory, AtlanteansSale } from '@/contracts/types'
import { Signer, SignerOrProvider, ContractTransaction, MerkleProof } from '@/types'
import { getChain, getProvider } from '@/utils'

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
  signer: Signer
  tokenAmount: number
}
interface IAtlanteansSaleUtilMintWithProof extends IAtlanteansSaleUtilMint {
  proof: MerkleProof
}
interface IAtlanteansSaleUtilMintWithSignature extends IAtlanteansSaleUtilMint {
  signature: string
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
    tokenAmount = 1,
  }: IAtlanteansSaleUtilMintWithProof): IAtlanteansSaleUtilMintResponse => {
    const address = await signer.getAddress()
    const chainId = await signer.getChainId()
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

    const tokenAmountMinted = await this.wlMintedAmount(address, chainId)
    const tokenAmountRemaining = MINT_LIMIT_TOTAL[SalePhase.WL] - tokenAmountMinted
    const maxTokenAmountPerTx = MINT_LIMIT_PER_TX[SalePhase.WL]
    if (tokenAmountRemaining <= 0) {
      return {
        error: MintError.ALREADY_MINTED,
      }
    }
    if (tokenAmount > tokenAmountRemaining) {
      return {
        error: MintError.LIMIT_TOTAL.replace('LIMIT_TO_REPLACE', tokenAmountRemaining.toString()),
      }
    }
    if (tokenAmount > maxTokenAmountPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxTokenAmountPerTx.toString()),
      }
    }

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

  static mintDA = async ({
    signer,
    tokenAmount = 1,
  }: IAtlanteansSaleUtilMint): IAtlanteansSaleUtilMintResponse => {
    const maxTokenAmountPerTx = MINT_LIMIT_PER_TX[SalePhase.DA]
    if (tokenAmount > maxTokenAmountPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxTokenAmountPerTx.toString()),
      }
    }

    const chainId = await signer.getChainId()
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

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

  static mintPublic = async ({
    signer,
    tokenAmount = 1,
  }: IAtlanteansSaleUtilMint): IAtlanteansSaleUtilMintResponse => {
    const maxTokenAmountPerTx = MINT_LIMIT_PER_TX[SalePhase.PUBLIC]
    if (tokenAmount > maxTokenAmountPerTx) {
      return {
        error: MintError.LIMIT_PER_TX.replace('LIMIT_TO_REPLACE', maxTokenAmountPerTx.toString()),
      }
    }

    const chainId = await signer.getChainId()
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

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

  static claim = async ({
    signer,
    tokenAmount,
    signature,
  }: IAtlanteansSaleUtilMintWithSignature): IAtlanteansSaleUtilMintResponse => {
    const [address, chainId] = await Promise.all([signer.getAddress(), signer.getChainId()])
    const contract = this.getContract({
      signerOrProvider: signer,
      chainId,
    })

    const [hasClaimStarted, hasClaimEnded, tokenAmountRemaining] = await Promise.all([
      contract.claimsStarted(),
      contract.claimsEnded(),
      contract.faToRemainingClaim(address),
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
    if (tokenAmountRemaining.lte(0)) {
      return {
        error: MintError.ALREADY_MINTED,
      }
    }
    if (tokenAmountRemaining.lt(tokenAmount)) {
      return {
        error: MintError.LIMIT_TOTAL.replace('LIMIT_TO_REPLACE', tokenAmountRemaining.toString()),
      }
    }

    const nonce = await signer.getTransactionCount()

    const tx = await contract.claimSummon(signature, tokenAmount, {
      gasLimit: MINT_GAS_LIMIT,
      nonce,
    })

    return { tx }
  }
}
