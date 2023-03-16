import { Characters, Timer } from '@/components'
import { Flex, Heading, VStack, Text } from '@chakra-ui/react'

export const MintPageHeader = () => (
  <Flex
    bg='atlanteans.aquaDark'
    direction={{ base: 'column', md: 'row' }}
    h='full'
    w='full'
    maxW='1440px'
    px={{ base: '24px', md: '50px', xl: '75px' }}
    pt={{ base: '30px', md: '50px' }}
    pb={{ base: '0', md: '50px' }}
    pos='relative'
  >
    <VStack
      spacing='40px'
      w={{ base: 'full', md: '420px', lg: '480px', xl: '515px' }}
      zIndex={1}
      alignItems='start'
      backdropFilter='blur(1px)'
    >
      <VStack spacing='16px' alignItems='start'>
        <Heading fontSize={{ base: '32px', xl: '36px' }}>Dutch Auction</Heading>
        <Text fontSize={{ base: '16px', md: '15px', xl: '16px' }}>
          True last-price dutch auction, meaning that if a user mints at 0.1420, but the collection
          sells out at a price point of 0.069ETH,or any other arbitrary price interval, all users
          will get the same price & be refunded any additional ETH.
        </Text>
      </VStack>
      <Timer />
    </VStack>
    <Characters />
  </Flex>
)
