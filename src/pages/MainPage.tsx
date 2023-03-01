import { Button, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

const MainPage = () => {
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
      </Flex>
    </>
  )
}

export default MainPage
