import { AtlantisWorldLogo } from 'public/assets/images'
import { ConnectButton, SocialButtons } from '@/components'
import { Flex, HStack, Link, Text } from '@chakra-ui/react'
import Image from 'next/image'
import NavigationLink from 'next/link'

type Tab = { name: string; href: string }
const tabs: Tab[] = [
  { name: 'About', href: '/about' },
  { name: 'Atlanteans', href: '/atlanteans' },
  { name: 'Blog', href: '/blog' },
  { name: 'Docs', href: '/docs' },
  { name: 'Marketplace', href: '/marketplace' },
]

export const Header = () => {
  const Logo = () => (
    <NavigationLink href='/'>
      <Image
        src={AtlantisWorldLogo}
        alt='Atlantis World'
        height={45}
        // style={{ minHeight: '45px' }}
      />
    </NavigationLink>
  )
  const Tabs = () => (
    <HStack h='full' spacing={0}>
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          isExternal
          h='full'
          display='inline-flex'
          alignItems='center'
          px={4}
        >
          <Text>{tab.name}</Text>
        </Link>
      ))}
    </HStack>
  )

  return (
    <Flex
      w='full'
      maxW='1440px'
      h='55px'
      px='75px'
      my='35px'
      justifyContent='space-between'
      alignItems='center'
      gap={5}
    >
      <Logo />
      <Tabs />
      <HStack spacing={8} h='full'>
        <SocialButtons />
        <ConnectButton />
      </HStack>
    </Flex>
  )
}
