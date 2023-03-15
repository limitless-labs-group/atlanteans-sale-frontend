import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from '@/constants'
import { PropsWithChildren } from 'react'
import { connectors } from '@/plugins/RainbowKit'

const { provider, webSocketProvider } = configureChains(SUPPORTED_CHAINS, [
  jsonRpcProvider({
    rpc: () => {
      return {
        http: DEFAULT_CHAIN.rpcUrls.default.http[0],
      }
    },
  }),
  publicProvider(),
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const WagmiProvider = ({ children }: PropsWithChildren) => (
  <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
)

export { WagmiProvider }
export default WagmiProvider
