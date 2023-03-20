import { ConnectButton, SocialButtons } from '@/components'
import { BLOG_URL, HOME_URL, ICONS_BASE_DIR, TEXTURES_BASE_DIR, WIKI_URL } from '@/constants'
import { useLocalStorage } from '@/hooks'
import { Tab } from '@/types'
import {
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import NavigationLink from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

export const Header = () => {
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
  ]

  const Logo = () => (
    <NavigationLink href='/'>
      <Image
        src={`${ICONS_BASE_DIR}/atlantis-world-logo-small.png`}
        h='45px'
        w='45px'
        objectFit='contain'
        display={{ base: 'none', lg: 'block', xl: 'none' }}
        loading='lazy'
      />
      <Image
        src={`${ICONS_BASE_DIR}/atlantis-world-logo.png`}
        h='45px'
        w='220px'
        objectFit='contain'
        display={{ base: 'block', lg: 'none', xl: 'block' }}
        loading='lazy'
      />
    </NavigationLink>
  )
  const Tabs = () => (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      display={{ base: 'none', lg: 'flex' }}
      whiteSpace='nowrap'
      h='full'
      spacing={0}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          isExternal
          h='full'
          display='inline-flex'
          alignItems='center'
          px={{ base: 3, xl: 4 }}
          onClick={tab.onClick}
        >
          <Text>{tab.name}</Text>
        </Link>
      ))}
    </Stack>
  )

  const MenuBurger = () => {
    const MenuListItem = ({ children, ...props }: PropsWithChildren & MenuItemProps) => (
      <MenuItem bg='atlanteans.aquaDark' py={3} {...props}>
        {children}
      </MenuItem>
    )
    return (
      <Flex display={{ base: 'block', lg: 'none' }}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            h='50px'
            w='50px'
            icon={<>☰</>}
            variant='outline'
            fontSize='20px'
            color='whiteAlpha.700'
            border='10px solid transparent'
            borderRadius='10px'
            style={{
              borderImage: `url('${TEXTURES_BASE_DIR}/pixel-border-gray.png') 10 stretch`,
            }}
            _active={{ bg: 'transparent' }}
            _focus={{ bg: 'transparent' }}
          />
          <MenuList
            zIndex={10}
            bg='atlanteans.aquaDark'
            border='10px solid transparent'
            borderRadius='20px'
            style={{
              borderImage: `url('${TEXTURES_BASE_DIR}/pixel-border-gray.png') 10 stretch`,
            }}
          >
            {tabs.map((tab) => (
              <Link key={tab.name} href={tab.href} onClick={tab.onClick} isExternal>
                <MenuListItem>{tab.name}</MenuListItem>
              </Link>
            ))}
            <MenuListItem cursor='default'>
              <SocialButtons w='full' justifyContent='space-around' />
            </MenuListItem>
            <MenuListItem cursor='default' display={{ base: 'block', md: 'none' }}>
              <ConnectButton w='full' />
            </MenuListItem>
          </MenuList>
        </Menu>
      </Flex>
    )
  }

  return (
    <Flex
      w='full'
      maxW='1440px'
      h='55px'
      px={{ base: '24px', md: '50px', xl: '75px' }}
      my={{ base: '20px', md: '35px' }}
      justifyContent='space-between'
      alignItems='center'
      gap={{ base: 2, lg: 4 }}
    >
      <Logo />
      <Tabs />
      <HStack spacing={{ base: 0, md: 6, '2xl': 8 }} h='full'>
        <SocialButtons spacing={{ base: 4, md: 6 }} display={{ base: 'none', lg: 'block' }} />
        <ConnectButton display={{ base: 'none', md: 'flex' }} />
        <MenuBurger />
      </HStack>
    </Flex>
  )
}
