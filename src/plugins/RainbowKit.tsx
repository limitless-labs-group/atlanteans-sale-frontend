import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider as RainbowKitDefaultProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
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
import { SUPPORTED_CHAINS as chains } from '@/constants'
import { PropsWithChildren } from 'react'
import { rainbowKitTheme } from '@/styles'

export const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: false }),
      injectedWallet({ chains, shimDisconnect: false }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ appName: 'Atlantis World', chains }),
    ],
  },
  {
    groupName: 'More',
    wallets: [
      rainbowWallet({ chains, shimDisconnect: false }),
      braveWallet({ chains, shimDisconnect: false }),
      trustWallet({ chains, shimDisconnect: false }),
      ledgerWallet({ chains }),
    ],
  },
])

export const RainbowKitProvider = ({ children }: PropsWithChildren) => (
  <RainbowKitDefaultProvider chains={chains} theme={rainbowKitTheme} coolMode>
    {children}
  </RainbowKitDefaultProvider>
)
