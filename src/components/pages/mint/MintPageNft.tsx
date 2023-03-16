import { Button, SocialButtons, Timer } from '@/components'
import { ICONS_BASE_DIR, IMAGES_BASE_DIR, TEXTURES_BASE_DIR } from '@/constants'
import { pressStart2p } from '@/styles'
import { Flex, Heading, HStack, Image, VStack, Text, Input, Stack } from '@chakra-ui/react'

export const MintPageNft = () => {
  const NftImage = () => (
    <Flex
      maxW='630px'
      maxH='630px'
      flex='0 100%'
      flexWrap='wrap'
      // maxW='90%'
      border='12px solid transparent'
      style={{ borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-image.png") 12 stretch` }}
    >
      <Image src={`${IMAGES_BASE_DIR}/nft-placeholder.jpg`} alt='Atlantean Character NFT' />
    </Flex>
  )
  const NftInfo = () => (
    <VStack w='full' whiteSpace='break-spaces' spacing='30px' alignItems='start'>
      <VStack spacing={{ base: '16px', md: '30px' }} w='full' alignItems='start'>
        <Heading fontSize={{ base: '32px', xl: '36px' }} textTransform='uppercase'>
          Atlantean NFT
        </Heading>
        <Text>
          Founding Atlanteans, some partner communities & selected Pre-mint winners are able to mint
          up to 2 NFTs per wallet, at a price of 0.05ETH.
        </Text>
      </VStack>
      <HStack spacing='12px'>
        <Flex
          bg='atlanteans.yellow'
          color='black'
          p='6px 12px 6px 10px'
          gap='4px'
          alignItems='center'
        >
          <Image src={`${ICONS_BASE_DIR}/eth.svg`} alt='Ethereum' h={25} />
          <Text fontSize='24px' fontWeight='bold'>
            0.069
          </Text>
        </Flex>
        <Text>1999 NFTs available</Text>
      </HStack>
    </VStack>
  )
  const QuantityInput = () => (
    <HStack h='56px' w='full'>
      <Button
        variant='squar'
        color='white'
        fontSize='2xl'
        fontFamily={pressStart2p.style.fontFamily}
        // onClick={() => setQuantity(quantity - 1)}
      >
        -
      </Button>
      <Input
        type='number'
        min={1}
        max={19}
        h='full'
        w={{ base: 'full', md: '200px' }}
        border='none'
        borderRadius='none'
        bg='whiteAlpha.100'
        fontSize='20px'
        fontFamily={pressStart2p.style.fontFamily}
        textAlign='center'
        _focus={{ boxShadow: 'none' }}
        defaultValue={1}
        // onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button
        variant='squar'
        color='white'
        fontSize='2xl'
        fontFamily={pressStart2p.style.fontFamily}
        // onClick={() => setQuantity(quantity + 1)}
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
    <Stack w='full' direction={{ base: 'column', md: 'row' }}>
      <Button colorScheme='yellow' size='lg' w='full'>
        Connect Wallet
      </Button>
      <Button size='lg' w='full' isDisabled>
        Mint
      </Button>
    </Stack>
  )
  const Share = () => (
    <HStack w='full' spacing='25px'>
      <Text fontSize='18px'>Share:</Text>
      <SocialButtons variant='round' borderColor='white' />
    </HStack>
  )

  return (
    <Flex w='full' bg='atlanteans.gradient' justifyContent='center'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing='30px'
        w='full'
        maxW='1440px'
        px={{ base: '20px', md: '50px', xl: '75px' }}
        py={{ base: '70px', md: '100px' }}
        alignItems={{ base: 'center', md: 'start' }}
      >
        <NftImage />
        <VStack w='full' spacing='40px' alignItems='start' py='10px'>
          <NftInfo />
          <QuantityInput />
          <PhaseTimer />
          <MintButtons />
          <Share />
        </VStack>
      </Stack>
    </Flex>
  )
}
