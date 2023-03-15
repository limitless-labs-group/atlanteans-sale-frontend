import { Timer, Button, SocialButtons } from '@/components'
import { pressStart2p } from '@/styles'
import { Flex, Heading, HStack, VStack, Text, Input } from '@chakra-ui/react'
import Image from 'next/image'
import { EthereumIcon, NftPlaceholder } from 'public/assets/images'

export const MintPageNft = () => {
  const Nft = () => (
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
        value={1}
        // onChange={(e) => {}}
      />
      <Button
        variant='squar'
        color='white'
        fontSize='2xl'
        fontFamily={pressStart2p.style.fontFamily}
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
        <Nft />
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
