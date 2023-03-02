import { DEFAULT_CHAIN } from '@/constants'
import { ATLANTEANS_CONTRACT_ADDRESS, Atlanteans, Atlanteans__factory } from '@/contracts'
import { SignerOrProvider } from '@/types'
import { getProvider } from '@wagmi/core'

export class AtlanteansUtil {
  public static getContract = (
    chainId_?: number,
    signerOrProvider?: SignerOrProvider
  ): Atlanteans => {
    const chainId = chainId_ ?? DEFAULT_CHAIN.id
    const provider = getProvider({ chainId })
    const address = ATLANTEANS_CONTRACT_ADDRESS[chainId]
    const atlanteansContract = Atlanteans__factory.connect(address, signerOrProvider ?? provider)
    return atlanteansContract
  }
}
