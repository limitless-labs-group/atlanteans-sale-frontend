import { Newsletter, SocialButtons } from '@/components'
import { BLOG_URL, BRAND_ASSETS_URL, HOME_URL, LEGAL_URL, WIKI_URL } from '@/constants'
import { Tab } from '@/types'
import { Divider, Stack, Link, VStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const Footer = () => {
  const router = useRouter()
  const isClaimPage = router.pathname.includes('claim')

  const tabs: Tab[] = [
    { name: 'Home', href: HOME_URL },
    {
      name: 'Story',
      onClick: () => {
        router.query.showStory = 'true'
        router.push(router)
      },
    },
    {
      name: isClaimPage ? 'Mint' : 'Claim',
      onClick: () => {
        router.push(isClaimPage ? '/' : '/claim')
      },
    },
    { name: 'Wiki', href: WIKI_URL },
    { name: 'Blog', href: BLOG_URL },
    { name: 'Brand Assets', href: BRAND_ASSETS_URL },
    { name: 'Legal', href: LEGAL_URL },
  ]

  const Tabs = () => (
    <Stack
      spacing={{ base: 6, md: 0 }}
      direction={{ base: 'column', md: 'row' }}
      h='full'
      alignItems='center'
    >
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          isExternal
          h='full'
          display='inline-flex'
          alignItems='center'
          px={{ md: 4 }}
          onClick={tab.onClick}
        >
          <Text>{tab.name}</Text>
        </Link>
      ))}
    </Stack>
  )
  const Copyright = () => <Text opacity='0.420'>© 2023 Atlantis World. All Rights Reserved.</Text>

  return (
    <VStack
      bg='atlanteans.aquaDark'
      w='full'
      maxW='1440px'
      pt={{ base: '50px', md: '75px' }}
      pb={{ base: '40px', md: '75px' }}
      px={{ base: '24px', md: '50px', xl: '75px' }}
      spacing={{ base: '40px', md: '50px' }}
      textAlign='center'
    >
      <Newsletter mb='10px' w={{ base: 'full', md: 'unset' }} />
      <Divider opacity={0.69} />
      <Tabs />
      <SocialButtons variant='round' />
      <Copyright />
    </VStack>
  )
}
