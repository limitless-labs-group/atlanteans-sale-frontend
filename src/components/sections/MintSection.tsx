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
import {
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Input,
  Stack,
  useNumberInput,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

interface IMintSection {
  salePhase: SalePhase
  price?: string | number
  remainingSupply?: string | number
  maxQuantity?: number
  onQuantityChange?: (newQuantity: number) => void
  onMintButtonClick?: () => void
}

export const MintSection = ({
  salePhase,
  price = '0.069',
  remainingSupply = 0,
  maxQuantity,
  onQuantityChange,
  onMintButtonClick,
}: IMintSection) => {
  const { isConnected } = useAccount()
  const { isActiveChainSupported } = useNetwork()
  const showConnectButton = !isConnected || !isActiveChainSupported

  const min = Number(maxQuantity) < 1 ? maxQuantity : 1

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value: quantity,
  } = useNumberInput({
    step: 1,
    defaultValue: min,
    min: min,
    max: maxQuantity ?? 19,
    precision: 0,
  })
  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  useEffect(() => {
    onQuantityChange?.(Number(quantity))
  }, [quantity])

  const NftImage = () => (
    <Flex
      maxH={{ base: 'full', md: '606px' }}
      maxW={{ base: 'full', md: '606px' }}
      w='full'
      overflow='hidden'
      border='12px solid transparent'
      pos='relative'
      style={{ borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-image.png") 12 stretch` }}
    >
      <Image
        src={`${IMAGES_BASE_DIR}/nft-placeholder.jpg`}
        alt='Atlantean Character NFT'
        bg='atlanteans.aqua'
        w='full'
        minH={{ base: 'calc(100vw / 1.25)', md: 'calc(100vw / 2.5)', '2xl': 'calc(606px - 24px)' }}
        objectFit='cover'
      />
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
        {...dec}
        variant='squar'
        color='white'
        fontSize='2xl'
        fontFamily={pressStart2p.style.fontFamily}
        // onClick={() => onQuantityChange?.(Number(quantity) - 1)}
      >
        -
      </Button>
      <Input
        {...input}
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
        pointerEvents='none'
        // value={quantity}
        // onChange={(e) => onQuantityChange?.(e.target.value)}
      />
      <Button
        {...inc}
        variant='squar'
        color='white'
        fontSize='2xl'
        fontFamily={pressStart2p.style.fontFamily}
        // onClick={() => onQuantityChange?.(Number(quantity) + 1)}
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
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing='30px'
      w='full'
      maxW='1440px'
      px={{ base: '20px', md: '50px', xl: '75px' }}
      pt={{ base: '70px', md: '100px' }}
      pb={{ base: '30px', md: '60px' }}
      alignItems={{ base: 'center', md: 'start' }}
    >
      <NftImage />
      <VStack w='full' spacing={{ base: '30px', md: '40px' }} alignItems='start' py='10px'>
        <NftInfo />
        <QuantityInput />
        {/* <Timer size='sm' title='STARTING IN:' display={{ base: 'none', md: 'flex' }} /> */}
        <MintButtons />
        {/* <Share /> */}
      </VStack>
    </Stack>
  )
}
