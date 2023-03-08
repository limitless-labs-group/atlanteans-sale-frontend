import { utils } from 'ethers'
import { ERC20, ERC20__factory } from '@/contracts/types'
import { DEFAULT_CHAIN } from '@/constants'
import { SignerOrProvider, BigNumber, Signer } from '@/types'
import { getChain, getProvider } from '@/utils'

export const GAS_LIMIT = 200_000
interface IERC20UtilGetContract {
  address: string
  signerOrProvider?: SignerOrProvider
  chainId?: number
}
export class ERC20Util {
  static getContract = ({
    address,
    signerOrProvider,
    chainId = DEFAULT_CHAIN.id,
  }: IERC20UtilGetContract): ERC20 => {
    const chain = getChain(chainId)
    const provider = getProvider({ chain })
    const contract = ERC20__factory.connect(address, signerOrProvider ?? provider)
    return contract
  }

  static fetchAllowance = async (
    owner: string,
    spender: string,
    token: string,
    provider?: SignerOrProvider
  ) => {
    const contract = this.getContract({ address: token, signerOrProvider: provider })
    const [value, decimals] = await Promise.all([
      contract.allowance(owner, spender),
      contract.decimals(),
    ])
    const formatted = Number(utils.formatUnits(value, decimals))
    return {
      value,
      formatted,
      decimals,
    }
  }

  static fetchBalanceOf = async (account: string, token: string, provider?: SignerOrProvider) => {
    const contract = this.getContract({ address: token, signerOrProvider: provider })
    const [value, decimals] = await Promise.all([contract.balanceOf(account), contract.decimals()])
    const formatted = Number(utils.formatUnits(value, decimals))
    return {
      value,
      formatted,
      decimals,
    }
  }

  static fetchDecimals = async (token: string, provider?: SignerOrProvider) => {
    const contract = this.getContract({ address: token, signerOrProvider: provider })
    const decimals = contract.decimals()
    return decimals
  }

  static approve = async (spender: string, value: BigNumber, token: string, signer: Signer) => {
    const contract = this.getContract({ address: token, signerOrProvider: signer })
    const tx = await contract.approve(spender, value, { gasLimit: GAS_LIMIT })
    return tx
  }
}
