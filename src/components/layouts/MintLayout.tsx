import { Footer, Head, Header } from '@/components'
import { VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const MintLayout = ({ children }: PropsWithChildren) => (
  <VStack w='full' spacing={0}>
    <Head />
    <Header />
    {children}
    <Footer />
  </VStack>
)
