import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
// import { InjectedConnector } from '@wagmi/core/connectors/injected'
// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'

import { SUPPORTED_CHAINS } from '@/constants'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { PropsWithChildren } from 'react'

const { provider, webSocketProvider, chains } = configureChains(SUPPORTED_CHAINS, [
  publicProvider(),
])

const { connectors } = getDefaultWallets({
  appName: 'Atlantis World',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const WagmiProvider = ({ children }: PropsWithChildren) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
  </WagmiConfig>
)

export { WagmiProvider }
export default WagmiProvider

// const client = createClient({
//   connectors: [
//     new InjectedConnector({ chains }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         qrcode: true,
//       },
//     }),
//   ],
//   provider,
//   webSocketProvider,
// })
