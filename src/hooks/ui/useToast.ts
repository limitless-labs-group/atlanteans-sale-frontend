import { useToast as useChakraToast } from '@chakra-ui/react'

export const useToast = () =>
  useChakraToast({
    isClosable: true,
    position: 'bottom-right',
    colorScheme: 'teal',
  })
