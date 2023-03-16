import { extendTheme as ChakraTheme } from '@chakra-ui/react'
import { darkTheme, Theme as RainbowKitTheme } from '@rainbow-me/rainbowkit'
import { Press_Start_2P, Quantico } from 'next/font/google'

export const pressStart2p = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
})
export const quantico = Quantico({ subsets: ['latin'], weight: '400' })

const atlanteansColors = {
  aqua: '#59DDBC',
  aquaDark: '#102634',
  aquaLight: '#D6FFFE',
  yellow: '#F2C94C',
  gray: '#0E121E',
  text: '#0E121E',
  gradient: 'linear-gradient(0deg, #59DDBC, #173A49)',
}

export const chakraTheme = ChakraTheme({
  fonts: {
    heading: pressStart2p.style.fontFamily,
    body: quantico.style.fontFamily,
  },
  colors: {
    atlanteans: atlanteansColors,
  },
  styles: {
    global: {
      body: {
        bg: atlanteansColors.aquaDark,
        color: 'white',
      },
      a: {
        _hover: {
          color: atlanteansColors.aqua,
          textDecoration: 'none !important',
        },
      },
    },
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1000px',
    xl: '1200px',
    '2xl': '1500px',
  },
})

const rainbowKitDefaultTheme = darkTheme()
export const rainbowKitTheme: RainbowKitTheme = {
  ...rainbowKitDefaultTheme,
  colors: {
    ...rainbowKitDefaultTheme.colors,
    accentColor: atlanteansColors.aqua,
    modalBackground: atlanteansColors.aquaDark,
    accentColorForeground: 'black',
  },
  fonts: {
    body: quantico.style.fontFamily,
  },
}
