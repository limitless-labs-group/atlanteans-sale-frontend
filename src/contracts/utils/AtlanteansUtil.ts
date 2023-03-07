import { DEFAULT_CHAIN, SupportedChainId } from '@/constants'
import { ATLANTEANS_CONTRACT_ADDRESS, Atlanteans, Atlanteans__factory } from '@/contracts'
import { SignerOrProvider } from '@/types'
import { getProvider } from '@wagmi/core'

export class AtlanteansUtil {
  static getContract = (chainId_?: number, signerOrProvider?: SignerOrProvider): Atlanteans => {
    const chainId = chainId_ ?? DEFAULT_CHAIN.id
    const provider = getProvider({ chainId })
    const address = ATLANTEANS_CONTRACT_ADDRESS[chainId as SupportedChainId]
    const contract = Atlanteans__factory.connect(address, signerOrProvider ?? provider)
    return contract
  }
}
