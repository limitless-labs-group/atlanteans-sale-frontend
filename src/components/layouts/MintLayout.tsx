import { Footer, Head, Header, OverviewSection, PerksSection, Story } from '@/components'
import { useLocalStorage } from '@/hooks'
import { Flex, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback, useEffect } from 'react'

export const MintLayout = ({ children }: PropsWithChildren) => {
  const [showStory, setShowStory] = useLocalStorage('showStory', true)

  const router = useRouter()
  useEffect(() => {
    if (router.query.showStory !== undefined) {
      setShowStory(router.query.showStory === 'true')
    }
  }, [router.query])

  const onStoryComplete = useCallback(() => {
    window?.scrollTo(0, 0)
    router.replace(router.pathname, undefined, { shallow: true })
    setShowStory(false)
  }, [router])

  return showStory ? (
    <Story onStoryComplete={onStoryComplete} />
  ) : (
    <VStack w='full' spacing={0} overflow='hidden'>
      <Head />
      <Header />
      <Flex
        w='full'
        bg='atlanteans.gradient'
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
        {children}
        <OverviewSection />
        <PerksSection />
      </Flex>
      <Footer />
    </VStack>
  )
}
