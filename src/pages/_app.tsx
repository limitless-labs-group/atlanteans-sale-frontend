import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider, RainbowKitProvider, WagmiProvider } from '@/plugins'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <WagmiProvider>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiProvider>
    </ChakraProvider>
  )
}

export default App
