import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

interface ITimer {
  timestamp?: number
  size?: 'sm' | 'lg'
}

export const Timer = ({ timestamp = 1679475581, size = 'lg' }: ITimer) => {
  //   const parsedDeadline = useMemo(() => Date.parse(timestamp), [timestamp])
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTime(timestamp * 1000 - Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const isSmall = size === 'sm'

  const TimerBlock = ({ children }: PropsWithChildren) => (
    <Flex
      // p={size === 'lg' ? '25px 16px' : '16px 10px'}
      w={isSmall ? '50px' : '69px'}
      h={isSmall ? '65px' : '90px'}
      color='black'
      bg='atlanteans.aquaLight'
      border='10px solid transparent'
      borderRadius='full'
      style={{
        borderImage: `url('/assets/images/textures/pixel-border-timer.png') 12 stretch`,
      }}
      alignItems='center'
      justifyContent='center'
    >
      <Heading fontSize={isSmall ? '14px' : '24px'}>{children}</Heading>
    </Flex>
  )

  return (
    <HStack spacing={isSmall ? '28px' : '36px'}>
      {Object.entries({
        // Days: time / DAY,
        Hrs: (time / HOUR) % 24,
        Min: (time / MINUTE) % 60,
        Sec: (time / SECOND) % 60,
      }).map(([label, value]) => {
        const firstDigit = Math.floor(value / 10)
        const secondDigit = Math.floor(value % 10)
        return (
          <VStack key={label} spacing={isSmall ? '10px' : '16px'}>
            <HStack spacing='4px' pos='relative'>
              <TimerBlock>{firstDigit}</TimerBlock>
              <TimerBlock>{secondDigit}</TimerBlock>
              {label !== 'Sec' && (
                <Text
                  fontSize={isSmall ? '3xl' : '4xl'}
                  pos='absolute'
                  right={isSmall ? '-20px' : '-24px'}
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
  )
}
