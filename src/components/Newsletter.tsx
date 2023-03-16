import { Button } from '@/components'
import { TEXTURES_BASE_DIR } from '@/constants'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Stack,
  Input,
  StackProps,
  HStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

export interface INewsletter extends StackProps {
  onSubmit?: () => void
}

export const Newsletter = ({ onSubmit, ...props }: INewsletter) => {
  const [email, setEmail] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (isInvalid) {
      setTimeout(() => setIsInvalid(false), 5000)
    }
  }, [isInvalid])

  const onSubmitButtonClick = useCallback(() => {
    if (isSubscribed) {
      return
    }
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    const isInvalid = !regex.test(email)
    setIsInvalid(isInvalid)
    if (isInvalid) {
      return
    }
    // TODO: connect newsletter api
    onSubmit?.()
    setIsSubscribed(true)
  }, [email])

  return (
    <Stack
      // lineHeight='56px'
      direction={{ base: 'column', md: 'row' }}
      alignItems='center'
      spacing={8}
      {...props}
    >
      <Heading size='16px' textTransform='uppercase'>
        Newsletter
      </Heading>
      <HStack spacing={-6} h='56px' w='full'>
        <FormControl h='full' isInvalid={isInvalid}>
          <Input
            type='email'
            placeholder='Your email'
            h='full'
            bg='transparent'
            border='10px solid transparent'
            style={{
              borderImage: `url('${TEXTURES_BASE_DIR}/pixel-border-gray.png') 10 stretch`,
            }}
            _focus={{ boxShadow: 'none' }}
            _invalid={{ boxShadow: 'none' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isInvalid && <FormErrorMessage>Email is invalid</FormErrorMessage>}
          {/* // TODO: replace with modal */}
          {isSubscribed && (
            <FormHelperText color='atlanteans.aqua'>Subscribed successfully. LFG!</FormHelperText>
          )}
        </FormControl>
        <Button
          h='full'
          w='70px'
          zIndex={1}
          fontSize='3xl'
          fontWeight='normal'
          onClick={onSubmitButtonClick}
        >
          {'⇝'}
        </Button>
      </HStack>
    </Stack>
  )
}
