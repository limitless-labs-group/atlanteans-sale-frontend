import React, { useEffect, useState } from 'react'
import { Button, Characters, MintLayout, SocialButtons, Timer } from '@/components'
import { Flex, Heading, VStack, Text, HStack, Input } from '@chakra-ui/react'
import { pressStart2p } from '@/styles'
import { EthereumIcon, NftPlaceholder } from 'public/assets/images'
import Image from 'next/image'

const MintPage = () => {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (quantity === Number(process.env.NEXT_PUBLIC_MAGIC_PLEASURE_NUMBER)) {
      window?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [quantity])

  /**
   * components
   */
  const Header = () => (
    <Flex
      bg='atlanteans.aquaDark'
      w='full'
      maxW='1440px'
      h='full'
      px='75px'
      py='50px'
      pos='relative'
    >
      <VStack spacing='40px' w='515px' maxW='90%' alignItems='start' zIndex={1}>
        <VStack spacing='16px' alignItems='start'>
          <Heading fontSize='36px'>Dutch Auction</Heading>
          <Text>
            True last-price dutch auction, meaning that if a user mints at 0.1420, but the
            collection sells out at a price point of 0.069ETH,or any other arbitrary price interval,
            all users will get the same price & be refunded any additional ETH.
          </Text>
        </VStack>
        <Timer />
      </VStack>
      <Characters right={0} bottom={0} />
    </Flex>
  )

  const Nft = () => {
    const NftImage = () => (
      <Flex
        maxW='630px'
        maxH='630px'
        flex='0 100%'
        flexWrap='wrap'
        // maxW='90%'
        border='12px solid transparent'
        style={{ borderImage: 'url("/assets/images/textures/pixel-border-image.png") 12 stretch' }}
      >
        <Image src={NftPlaceholder} alt='Atlantean Character NFT' />
      </Flex>
    )
    const NftInfo = () => (
      <VStack spacing='30px' alignItems='start'>
        <Heading fontSize='36px' textTransform='uppercase'>
          Atlantean NFT
        </Heading>
        <Text>
          Founding Atlanteans, some partner communities & selected Pre-mint winners are able to mint
          up to 2 NFTs per wallet, at a price of 0.05ETH.
        </Text>
        <HStack spacing='12px'>
          <Flex bg='atlanteans.yellow' color='black' p='6px 12px 6px 10px' gap='4px'>
            <Image src={EthereumIcon} alt='Ethereum' height={25} />
            <Text fontSize='24px' fontWeight='bold'>
              0.069
            </Text>
          </Flex>
          <Text>1999 NFTs available</Text>
        </HStack>
      </VStack>
    )
    const QuantityInput = () => (
      <HStack h='56px'>
        <Button
          variant='squar'
          color='white'
          fontSize='2xl'
          fontFamily={pressStart2p.style.fontFamily}
          onClick={() => setQuantity(quantity - 1)}
        >
          -
        </Button>
        <Input
          type='number'
          min={1}
          max={19}
          h='full'
          w='200px'
          border='none'
          borderRadius='none'
          bg='whiteAlpha.100'
          fontSize='20px'
          fontFamily={pressStart2p.style.fontFamily}
          textAlign='center'
          _focus={{ boxShadow: 'none' }}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Button
          variant='squar'
          color='white'
          fontSize='2xl'
          fontFamily={pressStart2p.style.fontFamily}
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </Button>
      </HStack>
    )
    const PhaseTimer = () => (
      <VStack spacing='20px' alignItems='start'>
        <Heading fontSize='24px' textTransform='uppercase'>
          Auction Ending in:
        </Heading>
        <Timer size='sm' />
      </VStack>
    )
    const MintButtons = () => (
      <HStack w='full'>
        <Button colorScheme='yellow' size='lg'>
          Connect Wallet
        </Button>
        <Button size='lg' isDisabled>
          Mint
        </Button>
      </HStack>
    )
    const Share = () => (
      <HStack w='full' spacing='25px'>
        <Text fontSize='18px'>Share:</Text>
        <SocialButtons variant='round' borderColor='white' />
      </HStack>
    )

    return (
      <Flex w='full' bg='atlanteans.gradient' justifyContent='center'>
        <HStack spacing='30px' w='full' maxW='1440px' px='75px' py='100px' alignItems='start'>
          <NftImage />
          <VStack spacing='40px' alignItems='start' py='10px'>
            <NftInfo />
            <QuantityInput />
            <PhaseTimer />
            <MintButtons />
            <Share />
          </VStack>
        </HStack>
      </Flex>
    )
  }

  return (
    <MintLayout>
      <Header />
      <Nft />
    </MintLayout>
  )
}

export default MintPage
