import { IMAGES_BASE_DIR, TEXTURES_BASE_DIR } from '@/constants'
import { Flex, Grid, Heading, Image, Stack } from '@chakra-ui/react'

export const PerksSection = () => {
  const perks: string[] = [
    'Pixel art',
    'Guild Membership',
    'Ecosystem givaways',
    'AtlanteanDAO Base Governance',
    'Eternal AW Whitelist',
    'Sprite with Walk Cycles',
    'Exclusive Airdrops',
    'Commercial Rights',
  ]

  const Perks = () => (
    <Grid
      templateRows={{
        base: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(2, 1fr)',
      }}
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gap={{ base: '20px', md: '30px' }}
      w='full'
      flexWrap='wrap'
    >
      {perks.map((perk, i) => {
        const isFirst = i === 0
        return (
          <Flex
            key={i}
            w='full'
            minH='200px'
            bg='atlanteans.aquaLight'
            color='atlanteans.text'
            p={{ base: `${isFirst ? 40 : 30}px 12px ${isFirst ? 0 : 24}px 12px` }}
            border='12px solid transparent'
            borderRadius='30px'
            style={{ borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-image.png") 12 stretch` }}
            alignItems={isFirst ? 'end' : 'center'}
            textAlign='center'
            pos='relative'
          >
            <Stack
              w='full'
              h='full'
              alignItems='center'
              spacing={6}
              justifyContent={isFirst ? 'space-between' : 'space-around'}
            >
              <Heading size='18px' px='20px' textTransform='capitalize' lineHeight='28px'>
                {perk}
              </Heading>
              <Image src={`${IMAGES_BASE_DIR}/perks/perk${i + 1}.jpg`} />
            </Stack>
          </Flex>
        )
      })}
    </Grid>
  )

  return (
    <Stack
      w='full'
      maxW='1440px'
      px={{ base: '20px', md: '50px', xl: '75px' }}
      pt={{ base: '30px', md: '6 0px' }}
      pb={{ base: '50px', md: '100px' }}
      spacing={{ base: '30px', md: '40px', xl: '72px' }}
    >
      <Heading
        textTransform='uppercase'
        fontSize={{ base: '28px', xl: '36px' }}
        lineHeight={{ base: '40px', md: '50px' }}
        textAlign={{ base: 'left', md: 'center' }}
      >
        NFT Holder
        <br />
        Perks
      </Heading>
      <Perks />
    </Stack>
  )
}
