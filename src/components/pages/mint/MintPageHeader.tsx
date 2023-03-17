import { Characters, Timer } from '@/components'
import { SalePhase, SALE_PHASE_HEADER_SUBTITLE, SALE_PHASE_HEADER_TITLE } from '@/constants'
import { Flex, Heading, VStack, Text } from '@chakra-ui/react'

interface IMintPageHeader {
  salePhase: SalePhase
}

export const MintPageHeader = ({ salePhase }: IMintPageHeader) => (
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
      spacing='25px'
      w={{ base: 'full', md: '420px', lg: '480px', xl: '515px' }}
      zIndex={1}
      alignItems='start'
      backdropFilter='blur(1px)'
    >
      <VStack spacing='16px' alignItems='start'>
        <Heading fontSize={{ base: '32px', xl: '36px' }} lineHeight='50px'>
          {SALE_PHASE_HEADER_TITLE[salePhase]}
        </Heading>
        <Text fontSize={{ base: '16px', md: '15px', xl: '16px' }}>
          {SALE_PHASE_HEADER_SUBTITLE[salePhase]}
        </Text>
      </VStack>
      <Timer subtitle='Starting in:' />
    </VStack>
    <Characters />
  </Flex>
)
