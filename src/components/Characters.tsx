import { Button, Modal } from '@/components'
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
    imageSrc: '/assets/images/characters/character1.png',
    zIndex: 6,
    leftOffset: '10px',
    bottomOffset: '115px',
  },
  {
    imageSrc: '/assets/images/characters/character2.png',
    zIndex: 1,
    leftOffset: '104px',
    bottomOffset: '180px',
    name: 'Oracle',
  },
  {
    imageSrc: '/assets/images/characters/character3.png',
    zIndex: 2,
    leftOffset: '110px',
    bottomOffset: '88px',
  },
  {
    imageSrc: '/assets/images/characters/character4.png',
    zIndex: 5,
    leftOffset: '263px',
    bottomOffset: '120px',
  },
  {
    imageSrc: '/assets/images/characters/character5.png',
    zIndex: 3,
    leftOffset: '275px',
    bottomOffset: '120px',
  },
  {
    imageSrc: '/assets/images/characters/character6.png',
    zIndex: 8,
    leftOffset: 0,
    bottomOffset: 0,
  },
  {
    imageSrc: '/assets/images/characters/character7.png',
    zIndex: 7,
    leftOffset: '80px',
    bottomOffset: 0,
    height: '170px',
  },
  {
    imageSrc: '/assets/images/characters/character8.png',
    zIndex: 9,
    leftOffset: '227px',
    bottomOffset: 0,
  },
  {
    imageSrc: '/assets/images/characters/character9.png',
    zIndex: 10,
    leftOffset: '303px',
    bottomOffset: 0,
  },
  {
    imageSrc: '/assets/images/characters/character10.png',
    zIndex: 4,
    leftOffset: '420px',
    bottomOffset: 0,
  },
]

export const Characters = ({ ...props }: ICharacters) => {
  const Oracle = characters[1]

  const onCharacterInteract = (character: Character) => {
    if (character.name === Oracle.name) {
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
          fuck you
        </Button>
        <Button onClick={closeDialogModal}>LFG!</Button>
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
      />
    )

    return (
      <Modal
        isOpen={isDialogOpen}
        onClose={closeDialogModal}
        size='xl'
        title={Oracle.name}
        pos='absolute'
        bottom='70px'
      >
        <>
          <Text>{`A number of pleasure, it's mirror in fact`}</Text>
          <Text>{`Reverse and input, then flirt with me back...`}</Text>
          <Buttons />
          <Character />
        </>
      </Modal>
    )
  }

  return (
    <>
      <Flex w='669px' h='420px' pos='absolute' zIndex={1} {...props}>
        {characters.map((character, i) => {
          const isFrontCharacter = i >= 5
          const translateY = `translateY(${isFrontCharacter ? 0 : -5}px)`
          return (
            <Image
              key={i}
              src={character.imageSrc}
              // h={character.height ?? '200px'}
              // w='200px'
              maxW='unset'
              pos='absolute'
              left={character.leftOffset}
              bottom={character.bottomOffset}
              zIndex={character.zIndex}
              transition='0.2s'
              transformOrigin='bottom'
              _hover={{ transform: `scale(1.04) ${translateY}` }}
              _active={{ transform: `scale(0.98)  ${translateY}` }}
              onClick={() => onCharacterInteract(character)}
            />
          )
        })}
        <DialogModal />
      </Flex>
    </>
  )
}
