import { Button, Head, Header } from '@/components'
import { useLocalStorage } from '@/hooks'
import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type Slide = { heading: string; text: string; imageSrc: string }
const slides: Slide[] = [
  {
    heading: 'The Humans',
    text: 'Story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans.',
    imageSrc: '/assets/images/story-example.jpg',
  },
  {
    heading: 'The Ancients',
    text: 'Story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients.',
    imageSrc: '/assets/images/story-example.jpg',
  },
  {
    heading: 'The Divines',
    text: 'Story about divines story about divines story about divines story about divines story about divines story about divines story!',
    imageSrc: '/assets/images/story-example.jpg',
  },
]

const StoryPage = () => {
  const router = useRouter()
  const [step, setStep] = useLocalStorage('storyStep', 0)
  const currentSlide = slides[step]
  const isLastSlide = step === slides.length - 1

  const handleNextButtonClick = useCallback(() => {
    if (isLastSlide) {
      goToMint()
      return
    }
    setStep(step + 1)
  }, [step, currentSlide, isLastSlide])

  const handleBackButtonClick = useCallback(() => {
    setStep(step - 1)
  }, [step])

  const goToMint = () => router.push('/mint')

  const Skip = () => (
    <Flex w='full' justifyContent='end'>
      <HStack spacing='20px'>
        <Text fontWeight='bold' fontSize='20px'>
          Skip
        </Text>
        <Button
          variant='squar'
          bg='white'
          color='atlanteans.text'
          fontSize='2xl'
          style={{
            borderImage: 'url("/assets/images/textures/pixel-border-gray.png") 12 stretch',
          }}
          onClick={goToMint}
        >
          ✕
        </Button>
      </HStack>
    </Flex>
  )
  const Illustration = () => (
    <Flex
      w='full'
      border='12px solid transparent'
      style={{ borderImage: 'url("/assets/images/textures/pixel-border-image.png") 12 stretch' }}
    >
      <Image src={currentSlide.imageSrc} alt={currentSlide.heading} width={1920} height={1080} />
    </Flex>
  )
  const Dialog = () => (
    <Flex
      w='full'
      maxW='900px'
      bg='white'
      color='atlanteans.text'
      p='40px 100px 50px 40px'
      borderRadius='10%'
      border='12px solid transparent'
      bgPos='right 20px bottom 10px'
      style={{ borderImage: 'url("/assets/images/textures/pixel-border-gray.png") 12 stretch' }}
    >
      <Stack w='full' spacing='16px'>
        <Heading fontSize='24px'>{currentSlide.heading}</Heading>
        <Text fontSize='20px'>{currentSlide.text}</Text>
      </Stack>
    </Flex>
  )
  const Buttons = () => (
    <Stack w='full' justifyContent='center' direction={{ base: 'column', md: 'row' }}>
      <Button
        colorScheme='yellow'
        size='lg'
        isDisabled={step === 0}
        onClick={handleBackButtonClick}
      >
        Back
      </Button>
      <Button size='lg' onClick={handleNextButtonClick}>
        {isLastSlide ? 'Go to Mint ⇝' : 'Next'}
      </Button>
    </Stack>
  )

  return (
    <Stack w='full' minH='100vh' alignItems='center' bg='atlanteans.gradient' pb='140px'>
      <Head />
      <Header />
      <Stack w='full' maxW='1440px' px='75px' spacing='40px' alignItems='center'>
        <Skip />
        <Illustration />
        <Dialog />
        <Buttons />
      </Stack>
    </Stack>
  )
}

export default StoryPage
