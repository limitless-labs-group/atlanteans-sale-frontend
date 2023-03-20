import { TEXTURES_BASE_DIR } from '@/constants'
import { Flex, StackProps, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

interface ITimer extends StackProps {
  timestamp?: number
  size?: 'sm' | 'lg'
  title?: string
  subtitle?: string
}

export const Timer = ({
  timestamp = 1679475581000,
  size = 'lg',
  title,
  subtitle,
  ...props
}: ITimer) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (timestamp <= Date.now()) {
      setTime(0)
      return
    }
    const interval = setInterval(() => setTime(timestamp - Date.now()), 1000)
    return () => clearInterval(interval)
  }, [timestamp])

  const timesMapping = useMemo(() => {
    const showDays = time / DAY > 1
    const showSec = !showDays
    return Object.entries({
      ...(showDays ? { Days: time / DAY } : {}),
      Hrs: (time / HOUR) % 24,
      Min: (time / MINUTE) % 60,
      ...(showSec ? { Sec: (time / SECOND) % 60 } : {}),
    })
  }, [time])

  const isSmall = size === 'sm'

  const TimerBlock = ({ children }: PropsWithChildren) => (
    <Flex
      w={{
        base: 'unset',
        md: isSmall ? '50px' : '44px',
        lg: isSmall ? '50px' : '52px',
        xl: isSmall ? '50px' : '62px',
        // '2xl': isSmall ? '50px' : '69px',
      }}
      h={{
        base: 'unset',
        md: isSmall ? '65px' : '60px',
        lg: isSmall ? '65px' : '70px',
        xl: isSmall ? '65px' : '80px',
        // '2xl': isSmall ? '65px' : '90px',
      }}
      p={{ base: 1, md: 0 }}
      color='black'
      bg='atlanteans.aquaLight'
      border='10px solid transparent'
      borderRadius='full'
      style={{
        borderImage: `url('${TEXTURES_BASE_DIR}/pixel-border-timer.png') 12 stretch`,
      }}
      alignItems='center'
      justifyContent='center'
    >
      <Heading
        fontSize={{
          base: '16px',
          md: isSmall ? '14px' : '18px',
          lg: isSmall ? '14px' : '22px',
          xl: isSmall ? '14px' : '24px',
        }}
      >
        {children}
      </Heading>
    </Flex>
  )

  return (
    <VStack spacing='20px' alignItems='start' {...props}>
      {title && (
        <Heading fontSize='24px' textTransform='uppercase'>
          {title}
        </Heading>
      )}
      {subtitle && <Text>{subtitle}</Text>}
      <HStack
        spacing={{ base: 4, md: isSmall ? '28px' : '28px', lg: isSmall ? '28px' : '36px' }}
        w={{ base: 'full', md: 'auto' }}
      >
        {timesMapping.map(([label, value], index) => {
          if (value < 0) {
            value = 0
          }
          const firstDigit = Math.floor(value / 10)
          const secondDigit = Math.floor(value % 10)
          return (
            <VStack
              key={index}
              spacing={{
                base: '10px',
                md: isSmall ? '10px' : '10px',
                lg: isSmall ? '10px' : '16px',
              }}
            >
              <HStack spacing={{ base: '2px', md: '4px' }} pos='relative'>
                <TimerBlock>{firstDigit}</TimerBlock>
                <TimerBlock>{secondDigit}</TimerBlock>
                {index !== timesMapping.length - 1 && (
                  <Text
                    fontSize={{
                      base: '3xl',
                      md: isSmall ? '3xl' : '3xl',
                      lg: isSmall ? '3xl' : '4xl',
                    }}
                    pos='absolute'
                    right={{
                      base: '-13px',
                      md: isSmall ? '-20px' : '-20px',
                      lg: isSmall ? '-20px' : '-24px',
                    }}
                    zIndex='1'
                  >
                    :
                  </Text>
                )}
              </HStack>
              <Text fontWeight='bold'>{label}</Text>
            </VStack>
          )
        })}
      </HStack>
    </VStack>
  )
}
