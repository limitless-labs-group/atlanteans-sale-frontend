import { DEFAULT_CHAIN, SupportedChainId } from '@/constants'
import { ATLANTEANS_CONTRACT_ADDRESS, Atlanteans, Atlanteans__factory } from '@/contracts'
import { SignerOrProvider } from '@/types'
import { getChain, getProvider } from '@/utils'

interface IAtlanteansUtilGetContract {
  signerOrProvider?: SignerOrProvider
  chainId?: number
}
export class AtlanteansUtil {
  static getContract = ({
    chainId = DEFAULT_CHAIN.id,
    signerOrProvider,
  }: IAtlanteansUtilGetContract): Atlanteans => {
    const chain = getChain(chainId)
    const provider = getProvider({ chain })
    const address = ATLANTEANS_CONTRACT_ADDRESS[chainId as SupportedChainId]
    const contract = Atlanteans__factory.connect(address, signerOrProvider ?? provider)
    return contract
  }
}
