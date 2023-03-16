import { TEXTURES_BASE_DIR } from '@/constants'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { useMemo } from 'react'

export interface IButton extends ButtonProps {
  colorScheme?: 'aqua' | 'yellow'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'squar'
}

export const Button = ({
  children,
  variant = 'default',
  size = 'sm',
  width: w,
  colorScheme = 'aqua',
  ...props
}: IButton) => {
  const sizeRatio = variant === 'squar' ? 1 : 4
  const height = useMemo(() => {
    switch (size) {
      case 'sm':
        return 44
      case 'md':
        return 56
      case 'lg':
        return 64
    }
  }, [size])
  const width = w ?? `${height * sizeRatio}px`
  const fontSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return '16px'
      case 'md':
        return '18px'
      case 'lg':
        return '20px'
    }
  }, [size])

  return (
    <ChakraButton
      variant='unstyled'
      display='inline-flex'
      color='black'
      p={4}
      w={width}
      h={`${height}px`}
      bg={`atlanteans.${colorScheme}`}
      border='10px solid transparent'
      borderRadius={height / 2}
      style={{
        borderImage: `url('${TEXTURES_BASE_DIR}/pixel-border-${colorScheme}.png') 40 stretch`,
      }}
      fontSize={fontSize}
      _hover={{ transform: 'scale(1.02)' }}
      _active={{ transform: 'scale(0.96)' }}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
