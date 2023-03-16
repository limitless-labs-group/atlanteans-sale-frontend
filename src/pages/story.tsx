import { Button, Head, Header } from '@/components'
import { IMAGES_BASE_DIR, TEXTURES_BASE_DIR } from '@/constants'
import { useLocalStorage } from '@/hooks'
import { Flex, Heading, HStack, Image, Slide, Stack, Text, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

type Slide = { heading: string; text: string; imageSrc: string }
const slides: Slide[] = [
  {
    heading: 'The Humans',
    text: 'Story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans story about humans.',
    imageSrc: `${IMAGES_BASE_DIR}/story-example.jpg`,
  },
  {
    heading: 'The Ancients',
    text: 'Story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients story about ancients.',
    imageSrc: `${IMAGES_BASE_DIR}/story-example.jpg`,
  },
  {
    heading: 'The Divines',
    text: 'Story about divines story about divines story about divines story about divines story about divines story about divines story!',
    imageSrc: `${IMAGES_BASE_DIR}/story-example.jpg`,
  },
]

const StoryPage = () => {
  const [isMobile] = useMediaQuery('(max-width: 767px)')

  // const [step, setStep] = useLocalStorage('storyStep', 0)
  const [step, setStep] = useState(0)
  const currentSlide = slides[step]
  const isLastSlide = step === slides.length - 1
  const [slideshowMode, setSlideshowMode] = useState(false)

  useEffect(() => {
    if (slideshowMode) {
      setTimeout(() => setSlideshowMode(false), 15000)
    }
  }, [slideshowMode])

  /**
   * handlers
   */
  const handleIllustrationClick = useCallback(() => {
    setSlideshowMode(!slideshowMode)
  }, [slideshowMode])

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

  /**
   * routing
   */
  const router = useRouter()
  const goToMint = () => router.push('/mint')

  const Skip = () => (
    <Flex w='full' justifyContent='end'>
      <HStack spacing='20px' cursor='pointer' onClick={goToMint}>
        <Text fontWeight='bold' fontSize={{ base: '18px', lg: '20px' }}>
          Skip
        </Text>
        <Button
          variant='squar'
          bg='white'
          color='atlanteans.text'
          fontSize='2xl'
          display={{ base: 'none', md: 'flex' }}
          style={{
            borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-white.png") 12 stretch`,
          }}
        >
          ✕
        </Button>
      </HStack>
    </Flex>
  )
  const Illustration = () => {
    const IllustrationImage = () => (
      <Image
        src={currentSlide.imageSrc}
        alt={currentSlide.heading}
        transform={{
          base: slideshowMode ? `scale(2) translateX(-25%)` : 'none',
          md: 'none',
        }}
      />
    )
    return (
      <Flex
        w='full'
        border='12px solid transparent'
        style={
          slideshowMode
            ? {}
            : { borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-image.png") 12 stretch` }
        }
        h={slideshowMode ? '100%' : 'auto'}
        pos={slideshowMode ? 'absolute' : 'initial'}
        bg={slideshowMode ? 'black' : 'none'}
        alignItems='center'
        top={0}
        left={0}
        zIndex={1}
        cursor='pointer'
        onClick={handleIllustrationClick}
      >
        <IllustrationImage />
        {isMobile && (
          <Slide
            direction='right'
            in={slideshowMode}
            style={{ zIndex: 10, transitionDuration: '20s' }}
          >
            <Flex alignItems='center' w='full' h='full'>
              <IllustrationImage />
            </Flex>
          </Slide>
        )}
      </Flex>
    )
  }
  const Dialog = () => (
    <Flex
      w='full'
      maxW='900px'
      bg='white'
      color='atlanteans.text'
      p={{ base: '16px 30px 24px 16px', md: '30px 70px 40px 30px', lg: '40px 100px 50px 40px' }}
      borderRadius='10%'
      border='12px solid transparent'
      bgPos='right 20px bottom 10px'
      style={{ borderImage: `url("${TEXTURES_BASE_DIR}/pixel-border-white.png") 12 stretch` }}
    >
      <Stack w='full' spacing={{ base: '12px', md: '16px' }}>
        <Heading fontSize={{ base: '18px', md: '20px', xl: '24px' }}>
          {currentSlide.heading}
        </Heading>
        <Text
          fontSize={{ base: '16px', lg: '18px' }}
          lineHeight={{ base: '18px', md: '22px', xl: '24px' }}
        >
          {currentSlide.text}
        </Text>
      </Stack>
    </Flex>
  )
  const Buttons = () => (
    <Stack
      w={{ base: 'full', md: '420px' }}
      justifyContent='center'
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Button
        colorScheme='yellow'
        size={isMobile ? 'md' : 'lg'}
        w='full'
        isDisabled={step === 0}
        onClick={handleBackButtonClick}
      >
        Back
      </Button>
      <Button size={isMobile ? 'md' : 'lg'} onClick={handleNextButtonClick} w='full'>
        {isLastSlide ? 'Go to Mint ⇝' : 'Next'}
      </Button>
    </Stack>
  )

  return (
    <Stack w='full' minH='100vh' alignItems='center' bg='atlanteans.gradient'>
      <Head />
      <Header />
      <Stack
        w='full'
        maxW='1440px'
        px={{ base: '20px', md: '50px', xl: '75px' }}
        pb={{ base: '50px', md: '70px', lg: '100px' }}
        spacing={slideshowMode ? 0 : { base: '20px', md: '30px', lg: '40px' }}
        alignItems='center'
      >
        <Skip />
        <Illustration />
        <Dialog />
        <Buttons />
      </Stack>
    </Stack>
  )
}

export default StoryPage
