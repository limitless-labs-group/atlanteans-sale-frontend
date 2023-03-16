import {
  Button,
  Heading,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'

export type IModal = ModalProps &
  ModalContentProps & {
    title?: string
  }

export const Modal = ({ title, onClose, isOpen, children, size, ...props }: IModal) => (
  <ChakraModal onClose={onClose} isOpen={isOpen} size={size} isCentered>
    <ModalOverlay />
    <ModalContent
      bg='white'
      color='atlanteans.text'
      //   p='40px 100px 50px 40px'
      borderRadius='15%'
      border='12px solid transparent'
      bgPos='right 20px bottom 10px'
      style={{ borderImage: 'url("/assets/images/textures/pixel-border-gray.png") 14 stretch' }}
      {...props}
    >
      <ModalHeader display='flex' justifyContent='space-between' alignItems='center' pr={2}>
        <Heading fontSize='2xl'>{title}</Heading>
        <Button
          variant='squar'
          bg='white'
          color='atlanteans.text'
          fontSize='2xl'
          style={{
            borderImage: 'url("/assets/images/textures/pixel-border-gray.png") 12 stretch',
          }}
          onClick={onClose}
        >
          ✕
        </Button>
      </ModalHeader>
      <ModalBody px={6} pb={6} pt={0}>
        {children}
      </ModalBody>
    </ModalContent>
  </ChakraModal>
)
