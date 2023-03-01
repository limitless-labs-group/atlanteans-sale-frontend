import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { WagmiProvider } from '@/plugins'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiProvider>
  )
}

export default App
