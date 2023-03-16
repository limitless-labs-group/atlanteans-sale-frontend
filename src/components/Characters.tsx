import { Button, Modal } from '@/components'
import { IMAGES_BASE_DIR } from '@/constants'
import { Flex, FlexProps, Image, Stack, Text, useDisclosure } from '@chakra-ui/react'

type ICharacters = Omit<FlexProps, 'children'>

type Character = {
  leftOffset: string | number
  bottomOffset: string | number
  zIndex: number
  imageSrc: string
  height?: string
  name?: string
}
const characters: Character[] = [
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character1.png`,
    zIndex: 6,
    leftOffset: '10px',
    bottomOffset: '115px',
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character2.png`,
    zIndex: 1,
    leftOffset: '104px',
    bottomOffset: '180px',
    name: 'Oracle',
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character3.png`,
    zIndex: 2,
    leftOffset: '110px',
    bottomOffset: '88px',
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character4.png`,
    zIndex: 5,
    leftOffset: '263px',
    bottomOffset: '120px',
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character5.png`,
    zIndex: 3,
    leftOffset: '275px',
    bottomOffset: '120px',
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character6.png`,
    zIndex: 8,
    leftOffset: 0,
    bottomOffset: 0,
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character7.png`,
    zIndex: 7,
    leftOffset: '80px',
    bottomOffset: 0,
    height: '170px',
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character8.png`,
    zIndex: 9,
    leftOffset: '227px',
    bottomOffset: 0,
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character9.png`,
    zIndex: 10,
    leftOffset: '303px',
    bottomOffset: 0,
  },
  {
    imageSrc: `${IMAGES_BASE_DIR}/characters/character10.png`,
    zIndex: 4,
    leftOffset: '440px',
    bottomOffset: 0,
  },
]

export const Characters = ({ ...props }: ICharacters) => {
  const Oracle = characters[1]

  const onCharacterInteract = (character: Character) => {
    if (character === Oracle) {
      openDialogModal()
    }
  }

  const {
    isOpen: isDialogOpen,
    onOpen: openDialogModal,
    onClose: closeDialogModal,
  } = useDisclosure()

  const DialogModal = () => {
    const Buttons = () => (
      <Stack
        justifyContent='start'
        direction={{ base: 'column', md: 'row' }}
        pos='absolute'
        bottom='-75px'
        left='-10px'
      >
        <Button colorScheme='yellow' onClick={closeDialogModal}>
          Later
        </Button>
        {/* <Button onClick={closeDialogModal}>LFG!</Button> */}
      </Stack>
    )
    const Character = () => (
      <Image
        src={Oracle.imageSrc}
        pos='absolute'
        top='-12px'
        left='5%'
        transform='translateY(-100%) scaleX(-1)'
        overflow='hidden'
        alt='Oracle'
      />
    )

    return (
      <Modal
        isOpen={isDialogOpen}
        onClose={closeDialogModal}
        size='xl'
        title={Oracle.name}
        pos='absolute'
        bottom={{ base: '50px', md: '70px' }}
        showCloseButton={false}
      >
        <>
          <Text>{`The number of pleasure, it's mirror in fact`}</Text>
          <Text>{`Reverse and input, then flirt with me back...`}</Text>
          <Buttons />
          <Character />
        </>
      </Modal>
    )
  }

  return (
    <>
      <Flex
        pos={{ base: 'initial', md: 'absolute' }}
        right={0}
        bottom={0}
        w={{ base: 'full', md: '669px' }}
        h={{ base: '250px', md: '420px' }}
        transform={{
          base: 'scale(0.6)',
          md: 'scale(.69)',
          lg: 'scale(.76)',
          xl: 'scale(.9)',
          '2xl': 'scale(1)',
        }}
        transformOrigin={{ base: 'left bottom', md: 'right bottom' }}
        zIndex={0}
        {...props}
      >
        {characters.map((character, i) => {
          const isFrontCharacter = i >= 5
          const translateY = `translateY(${isFrontCharacter ? 0 : -5}px)`
          return (
            <Image
              key={i}
              src={character.imageSrc}
              // h='40%'
              // w='200px'
              maxW='unset'
              pos='absolute'
              left={character.leftOffset}
              bottom={character.bottomOffset}
              zIndex={character.zIndex}
              transition='0.2s'
              transformOrigin='bottom'
              cursor={character === Oracle ? 'help' : 'default'}
              _hover={{ transform: `scale(1.04) ${translateY}` }}
              _active={{ transform: `scale(0.98)  ${translateY}` }}
              onClick={() => onCharacterInteract(character)}
              alt={`Character ${i + 1}`}
            />
          )
        })}
        <DialogModal />
      </Flex>
    </>
  )
}
