import { ICONS_BASE_DIR } from '@/constants'
import { HStack, Image, Link, StackProps } from '@chakra-ui/react'

type Social = { name: string; href: string; imageSrc: string }
const socials: Social[] = [
  { name: 'Discord', href: '', imageSrc: `${ICONS_BASE_DIR}/discord.svg` },
  { name: 'Opensea', href: '', imageSrc: `${ICONS_BASE_DIR}/opensea.svg` },
  { name: 'Twitter', href: '', imageSrc: `${ICONS_BASE_DIR}/twitter.svg` },
  { name: 'Telegram', href: '', imageSrc: `${ICONS_BASE_DIR}/telegram.svg` },
]

interface ISocialButtons extends Omit<StackProps, 'children'> {
  variant?: 'flat' | 'round'
  borderColor?: string
}

export const SocialButtons = ({
  variant = 'flat',
  borderColor = 'rgba(255,255,255,0.1)',
  spacing,
  ...props
}: ISocialButtons) => {
  const isRound = variant === 'round'
  const iconSize = isRound ? '18px' : '24px'
  const defaultSpacing = isRound ? '12px' : 0
  return (
    <HStack spacing={spacing ?? defaultSpacing} h='full' whiteSpace='nowrap' {...props}>
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          isExternal
          display='inline-flex'
          borderRadius='full'
          alignItems='center'
          justifyContent='center'
          px={isRound ? 4 : 0}
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
