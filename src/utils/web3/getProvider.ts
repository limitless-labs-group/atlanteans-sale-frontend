import { Chain } from '@/types'
import { providers } from 'ethers'

interface IGetProvider {
  chain?: Chain
}

export const getProvider = ({ chain }: IGetProvider): providers.JsonRpcProvider => {
  const provider = new providers.JsonRpcProvider(chain?.rpcUrls.public.http[0], {
    chainId: chain?.id ?? 1,
    name: `${chain?.name}`,
  })
  return provider
}
