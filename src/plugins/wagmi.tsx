import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from '@/constants'
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  injectedWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  braveWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { PropsWithChildren } from 'react'

const { provider, webSocketProvider, chains } = configureChains(SUPPORTED_CHAINS, [
  jsonRpcProvider({
    rpc: () => {
      return {
        http: DEFAULT_CHAIN.rpcUrls.default.http[0],
      }
    },
  }),
  publicProvider(),
])

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains }),
      injectedWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ appName: 'Atlantis World', chains }),
    ],
  },
  {
    groupName: 'More',
    wallets: [
      rainbowWallet({ chains }),
      braveWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const WagmiProvider = ({ children }: PropsWithChildren) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
)

export { WagmiProvider }
export default WagmiProvider
