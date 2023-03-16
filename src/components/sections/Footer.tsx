import { Newsletter, SocialButtons } from '@/components'
import { Divider, Stack, Link, VStack, Text } from '@chakra-ui/react'

type Tab = { name: string; href: string }
const tabs: Tab[] = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Docs', href: '/docs' },
  { name: 'Brand Assets', href: '/brand-assets' },
  { name: 'Terms of Use', href: '/tos' },
  { name: 'Privacy Policy', href: '/pp' },
]

export const Footer = () => {
  const Tabs = () => (
    <Stack
      spacing={{ base: 6, md: 8 }}
      direction={{ base: 'column', md: 'row' }}
      h='full'
      my={10}
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
      <Divider />
      <Tabs />
      <SocialButtons variant='round' />
      <Copyright />
    </VStack>
  )
}
