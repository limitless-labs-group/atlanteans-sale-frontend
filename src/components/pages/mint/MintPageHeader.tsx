import { Timer } from '@/components'
import { Flex, Heading, VStack, Text, Image } from '@chakra-ui/react'

export const MintPageHeader = () => (
  <Flex bg='atlanteans.aquaDark' w='full' maxW='1440px' h='full' px='75px' py='50px' pos='relative'>
    <Image
      src='/assets/images/characters.jpg'
      alt='Atlantean Characters'
      maxW='40vw'
      maxH='100%'
      pos='absolute'
      right='6%'
      bottom={0}
    />
    <VStack spacing='40px' w='515px' maxW='90%' alignItems='start' zIndex={1}>
      <VStack spacing='16px' alignItems='start'>
        <Heading fontSize='36px'>Dutch Auction</Heading>
        <Text>
          True last-price dutch auction, meaning that if a user mints at 0.1420, but the collection
          sells out at a price point of 0.069ETH,or any other arbitrary price interval, all users
          will get the same price & be refunded any additional ETH.
        </Text>
      </VStack>
      <Timer />
    </VStack>
  </Flex>
)
