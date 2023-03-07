import { BigNumber, Signer, utils } from 'ethers'
import { ERC20, ERC20__factory } from '@/contracts'
import { DEFAULT_CHAIN } from '@/constants'
import { getProvider } from '@wagmi/core'
import { SignerOrProvider } from '@/types'

export class ERC20Util {
  static getContract = (address: string, signerOrProvider?: SignerOrProvider): ERC20 => {
    const provider = getProvider({ chainId: DEFAULT_CHAIN.id })
    const erc20Contract = ERC20__factory.connect(address, signerOrProvider ?? provider)
    return erc20Contract
  }

  static fetchAllowance = async (
    owner: string,
    spender: string,
    token: string,
    provider?: SignerOrProvider
  ) => {
    const erc20Contract = this.getContract(token, provider)
    const allowance = await erc20Contract.allowance(owner, spender)
    return allowance
  }

  static fetchBalanceOf = async (account: string, token: string, provider?: SignerOrProvider) => {
    const erc20Contract = this.getContract(token, provider)
    const [balanceBN, decimals] = await Promise.all([
      erc20Contract.balanceOf(account),
      erc20Contract.decimals(),
    ])
    const balance = Number(utils.formatUnits(balanceBN, decimals))
    return balance
  }

  static fetchDecimals = async (token: string, provider?: SignerOrProvider) => {
    const erc20Contract = this.getContract(token, provider)
    const decimals = erc20Contract.decimals()
    return decimals
  }

  static approve = async (spender: string, value: BigNumber, token: string, signer: Signer) => {
    const erc20Contract = this.getContract(token, signer)
    const tx = await erc20Contract.approve(spender, value, { gasLimit: 200_000 })
    return tx
  }
}
