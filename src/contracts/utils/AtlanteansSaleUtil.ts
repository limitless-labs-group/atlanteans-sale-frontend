import { DEFAULT_CHAIN } from '@/constants'
import {
  ATLANTEANS_SALE_CONTRACT_ADDRESS,
  AtlanteansSale__factory,
  AtlanteansSale,
} from '@/contracts'
import { SignerOrProvider } from '@/types'
import { getProvider } from '@wagmi/core'

export class AtlanteansSaleUtil {
  public static getContract = (
    chainId_?: number,
    signerOrProvider?: SignerOrProvider
  ): AtlanteansSale => {
    const chainId = chainId_ ?? DEFAULT_CHAIN.id
    const provider = getProvider({ chainId })
    const address = ATLANTEANS_SALE_CONTRACT_ADDRESS[chainId]
    const atlanteansSaleContract = AtlanteansSale__factory.connect(
      address,
      signerOrProvider ?? provider
    )
    return atlanteansSaleContract
  }
}
