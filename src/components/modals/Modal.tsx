import { TEXTURES_BASE_DIR } from '@/constants'
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
    showCloseButton?: boolean
  }

export const Modal = ({
  title,
  showCloseButton = true,
  onClose,
  isOpen,
  children,
  size,
  ...props
}: IModal) => (
  <ChakraModal onClose={onClose} isOpen={isOpen} size={size} isCentered>
    <ModalOverlay />
    <ModalContent
      bg='white'
      color='atlanteans.text'
      w={{ base: 'calc(100vw - 40px)' }}
      borderRadius='15%'
      border='12px solid transparent'
      bgPos='right 20px bottom 10px'
      style={{ borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-white.png") 14 stretch` }}
      {...props}
    >
      <ModalHeader
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        pr={2}
        px={{ base: 4, md: 6 }}
      >
        <Heading fontSize='2xl'>{title}</Heading>
        {showCloseButton && (
          <Button
            variant='squar'
            bg='white'
            color='atlanteans.text'
            fontSize='2xl'
            style={{
              borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-white.png") 12 stretch`,
            }}
            onClick={onClose}
          >
            ✕
          </Button>
        )}
      </ModalHeader>
      <ModalBody px={{ base: 4, md: 6 }} pb={6} pt={0}>
        {children}
      </ModalBody>
    </ModalContent>
  </ChakraModal>
)
