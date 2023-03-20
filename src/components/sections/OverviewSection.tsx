import { ICONS_BASE_DIR, IMAGES_BASE_DIR, TEXTURES_BASE_DIR } from '@/constants'
import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'

export const OverviewSection = () => {
  const PhaseContainer = ({
    title = '',
    prices = [0.05],
    supplyText = '',
    mintLimitText = '',
    imageSrc = ``,
  }) => (
    <Flex
      w='full'
      pos='relative'
      bg='atlanteans.aquaLight'
      color='atlanteans.text'
      p={{ base: '18px 12px', md: '24px 20px', lg: '30px 24px', '2xl': '40px 32px' }}
      border='12px solid transparent'
      borderRadius='30px'
      style={{ borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-image.png") 12 stretch` }}
    >
      <Stack
        w={{ base: '80%', xl: '65%', '2xl': '50%' }}
        spacing={{ base: '19px', md: '32px' }}
        zIndex={10}
        backdropFilter='blur(1px)'
      >
        <Heading fontSize={{ base: '18px', md: '22px', lg: '24px', xl: '28px' }}>{title}</Heading>
        <Stack spacing='10px'>
          <Flex gap={{ base: '6px', md: '10px' }} alignItems='center' wrap='wrap' lineHeight={4}>
            {prices.map((price, i) => (
              <>
                {i > 0 && <Text>to</Text>}
                <Flex gap='4px' alignItems='center'>
                  <Image
                    src={`${ICONS_BASE_DIR}/eth-green.svg`}
                    alt='Ethereum'
                    h={{ base: '20px', md: '26px', xl: '30px' }}
                  />
                  <Text
                    fontSize={{ base: '22px', md: '26px', xl: '32px' }}
                    fontWeight='bold'
                    color='atlanteans.green'
                  >
                    {price}
                  </Text>
                </Flex>
              </>
            ))}
          </Flex>
          <Text lineHeight={5}>{supplyText}</Text>
        </Stack>
        <Text fontSize={{ base: '17px', md: '19px' }} fontWeight='bold'>
          {mintLimitText}
        </Text>
      </Stack>
      <Image
        src={imageSrc}
        pos='absolute'
        right={{ base: -5, md: -2, lg: -5, '2xl': 3 }}
        bottom={0}
        h={{ base: '45vw', md: '110%', lg: '25vw', xl: '110%' }}
        maxH='110%'
      />
    </Flex>
  )

  const WLPhase = () => (
    <PhaseContainer
      title='Allowlist Sale'
      prices={[0.05]}
      supplyText='1999 NFTs available'
      mintLimitText='2 mints per wallet'
      imageSrc={`${IMAGES_BASE_DIR}/characters/character-wl-phase.png`}
    />
  )
  const PublicPhase = () => (
    <PhaseContainer
      title='Public Mint'
      prices={[0.142, 0.069]}
      supplyText='Dutch Auction: 2540 NFTs available'
      mintLimitText='19 NFTs per transaction'
      imageSrc={`${IMAGES_BASE_DIR}/characters/character-public-phase.png`}
    />
  )

  return (
    <Stack
      w='full'
      maxW='1440px'
      px={{ base: '20px', md: '50px', xl: '75px' }}
      pt={{ base: '30px', md: '60px' }}
      pb={{ base: '30px', md: '60px' }}
      spacing={{ base: '30px', md: '40px', xl: '72px' }}
    >
      <Heading
        textTransform='uppercase'
        fontSize={{ base: '28px', xl: '36px' }}
        lineHeight={{ base: '40px', md: '50px' }}
        textAlign={{ base: 'left', md: 'center' }}
      >
        Atlanteans Overview:
        <br />
        Sales Phases
      </Heading>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '20px', md: '30px' }}
        w='full'
      >
        <WLPhase />
        <PublicPhase />
      </Stack>
    </Stack>
  )
}
