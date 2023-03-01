import { Button, Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const MainPage = () => {
  const { address } = useAccount()

  return (
    <>
      <Head>
        <title>Atlanteans NFT - Mint is live</title>
        <meta name='description' content='Atlanteans NFT' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex minH='100vh' justifyContent='center' alignItems='center'>
        <Button
          onClick={() => {
            throw new Error('Sentry Frontend Error')
          }}
        >
          Throw error
        </Button>
        <ConnectButton />
        <Text>{address}</Text>
      </Flex>
    </>
  )
}

export default MainPage
