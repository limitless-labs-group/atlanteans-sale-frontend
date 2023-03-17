import { Button, ConnectButton, SocialButtons, Timer } from '@/components'
import {
  ICONS_BASE_DIR,
  IMAGES_BASE_DIR,
  SalePhase,
  SALE_PHASE_NFT_INFO_SUBTITLE,
  SALE_PHASE_NFT_INFO_TITLE,
  TEXTURES_BASE_DIR,
} from '@/constants'
import { useNetwork } from '@/hooks'
import { pressStart2p } from '@/styles'
import { Flex, Heading, HStack, Image, VStack, Text, Input, Stack } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

interface IMintPageHeader {
  salePhase: SalePhase
  price?: string | number
  remainingSupply?: string | number
  quantity?: string | number
  onQuantityChange?: (quantity: string | number) => void
  onMintButtonClick?: () => void
}

export const MintPageNft = ({
  salePhase,
  price = '0.069',
  remainingSupply = 0,
  quantity,
  onQuantityChange,
  onMintButtonClick,
}: IMintPageHeader) => {
  const { isConnected } = useAccount()
  const { isActiveChainSupported } = useNetwork()
  const showConnectButton = !isConnected || !isActiveChainSupported

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
    <VStack
      w='full'
      whiteSpace='break-spaces'
      spacing={{ base: '16px', md: '30px' }}
      alignItems='start'
    >
      <VStack spacing={{ base: '16px', md: '30px' }} w='full' alignItems='start'>
        <Heading
          fontSize={{ base: '32px', xl: '36px' }}
          lineHeight='50px'
          textTransform='uppercase'
        >
          {SALE_PHASE_NFT_INFO_TITLE[salePhase]}
        </Heading>
        <Text>{SALE_PHASE_NFT_INFO_SUBTITLE[salePhase]}</Text>
      </VStack>
      {salePhase !== SalePhase.CLAIM && (
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
              {price}
            </Text>
          </Flex>
          <Text>{remainingSupply} NFTs available</Text>
        </HStack>
      )}
    </VStack>
  )
  const QuantityInput = () => (
    <HStack h='56px' w={{ base: 'full', md: '300px', lg: '375px' }}>
      <Button
        variant='squar'
        color='white'
        fontSize='2xl'
        fontFamily={pressStart2p.style.fontFamily}
        onClick={() => onQuantityChange?.(Number(quantity) - 1)}
      >
        -
      </Button>
      <Input
        type='number'
        h='full'
        w='full'
        border='none'
        borderRadius='none'
        bg='whiteAlpha.100'
        fontSize='20px'
        fontFamily={pressStart2p.style.fontFamily}
        textAlign='center'
        _focus={{ boxShadow: 'none' }}
        defaultValue={1}
        value={quantity}
        onChange={(e) => onQuantityChange?.(e.target.value)}
      />
      <Button
        variant='squar'
        color='white'
        fontSize='2xl'
        fontFamily={pressStart2p.style.fontFamily}
        onClick={() => onQuantityChange?.(Number(quantity) + 1)}
      >
        +
      </Button>
    </HStack>
  )
  const MintButtons = () => (
    <Stack w={{ base: 'full', md: '300px', lg: '375px' }} direction={{ base: 'column' }}>
      {showConnectButton && (
        <ConnectButton colorScheme='yellow' size='lg' w='full'>
          Connect Wallet
        </ConnectButton>
      )}
      <Button size='lg' w='full' isDisabled={!isConnected} onClick={onMintButtonClick}>
        {salePhase === SalePhase.CLAIM ? 'Claim' : 'Mint'}
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
        <VStack w='full' spacing={{ base: '30px', md: '40px' }} alignItems='start' py='10px'>
          <NftInfo />
          <QuantityInput />
          {/* <Timer size='sm' title='STARTING IN:' display={{ base: 'none', md: 'flex' }} /> */}
          <MintButtons />
          <Share />
        </VStack>
      </Stack>
    </Flex>
  )
}
