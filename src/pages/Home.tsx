import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Home = () => {
  return (
    <>
      <Head>
        <title>Atlanteans NFT - Mint is live</title>
        <meta name='description' content='Atlanteans NFT' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex minH='100vh' justifyContent='center' alignItems='center'>
        <ConnectButton />
      </Flex>
    </>
  )
}

export default Home
