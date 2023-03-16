import { Button } from '@/components'
import { Flex, FlexProps } from '@chakra-ui/react'
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'

export const ConnectButton = ({ ...props }: FlexProps) => (
  <Flex {...props}>
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return <Button onClick={openConnectModal}>Connect Wallet</Button>
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} colorScheme='yellow'>
                    Wrong network
                  </Button>
                )
              }
              return (
                <Button onClick={openAccountModal} width='auto'>
                  {account.displayName}
                </Button>
              )
            })()}
          </div>
        )
      }}
    </RainbowConnectButton.Custom>
  </Flex>
)
