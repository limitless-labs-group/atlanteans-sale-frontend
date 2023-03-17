import { Button, IButton } from '@/components'
import { Flex, FlexProps } from '@chakra-ui/react'
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'

type IConnectButton = IButton & FlexProps

export const ConnectButton = ({ colorScheme, ...props }: IConnectButton) => (
  <Flex {...props}>
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain
        return (
          <Flex
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            {...props}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} colorScheme={colorScheme} {...props}>
                    Connect Wallet
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} colorScheme='yellow' {...props}>
                    Wrong network
                  </Button>
                )
              }
              return (
                <Button onClick={openAccountModal} width='auto' {...props}>
                  {account.displayName}
                </Button>
              )
            })()}
          </Flex>
        )
      }}
    </RainbowConnectButton.Custom>
  </Flex>
)
