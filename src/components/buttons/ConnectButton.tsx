import { Button } from '@/components'
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'

export const ConnectButton = () => (
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
            return <Button onClick={openAccountModal}>{account.displayName}</Button>
          })()}
        </div>
      )
    }}
  </RainbowConnectButton.Custom>
)
