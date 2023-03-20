import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider, RainbowKitProvider, WagmiProvider } from '@/plugins'
import { StoreProvider } from '@/store'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <WagmiProvider>
        <RainbowKitProvider>
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </ChakraProvider>
  )
}

export default App
