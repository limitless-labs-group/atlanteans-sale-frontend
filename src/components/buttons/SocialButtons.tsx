import { HStack, Link, Image } from '@chakra-ui/react'

type Social = { name: string; href: string; imageSrc: string }
const socials: Social[] = [
  { name: 'Discord', href: '', imageSrc: '/assets/images/icons/discord.svg' },
  { name: 'Opensea', href: '', imageSrc: '/assets/images/icons/opensea.svg' },
  { name: 'Twitter', href: '', imageSrc: '/assets/images/icons/twitter.svg' },
  { name: 'Telegram', href: '', imageSrc: '/assets/images/icons/telegram.svg' },
]

interface ISocialButtons {
  variant?: 'flat' | 'round'
  borderColor?: string
  spacing?: number
}

export const SocialButtons = ({
  variant = 'flat',
  borderColor = 'rgba(255,255,255,0.1)',
  spacing,
}: ISocialButtons) => {
  const isRound = variant === 'round'
  const iconSize = isRound ? '18px' : '24px'
  const defaultSpacing = isRound ? '12px' : 0
  return (
    <HStack spacing={spacing ?? defaultSpacing} h='full'>
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          isExternal
          display='inline-flex'
          borderRadius='full'
          alignItems='center'
          justifyContent='center'
          px={4}
          _hover={{ transform: 'scale(1.1)' }}
          {...(isRound
            ? { h: '40px', w: '40px', border: '1px solid', borderColor }
            : { h: 'full' })}
        >
          <Image src={social.imageSrc} alt={social.name} minW={iconSize} minH={iconSize} />
        </Link>
      ))}
    </HStack>
  )
}
