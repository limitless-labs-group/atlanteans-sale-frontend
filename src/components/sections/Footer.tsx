import { Newsletter, SocialButtons } from '@/components'
import { Divider, HStack, Link, VStack, Text } from '@chakra-ui/react'

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
    <HStack spacing={8} h='full' my={10}>
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
    </HStack>
  )
  const Copyright = () => <Text opacity='0.420'>© 2023 Atlantis World. All Rights Reserved.</Text>

  return (
    <VStack bg='atlanteans.aquaDark' w='full' maxW='1440px' p='75px' spacing='50px'>
      <Newsletter mb='10px' />
      <Divider />
      <Tabs />
      <SocialButtons variant='round' />
      <Copyright />
    </VStack>
  )
}
