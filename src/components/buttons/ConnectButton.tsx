import { Button, IButton, Modal } from '@/components'
import { NFT_LEGAL_URL } from '@/constants'
import { Flex, FlexProps, Link, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'

type IConnectButton = IButton & FlexProps

export const ConnectButton = ({ colorScheme, ...props }: IConnectButton) => {
  const {
    isOpen: isTermsModalOpen,
    onClose: closeTermsModal,
    onOpen: openTermsModal,
  } = useDisclosure()

  return (
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
                    <>
                      <Button onClick={openTermsModal} colorScheme={colorScheme} {...props}>
                        Connect Wallet
                      </Button>
                      <Modal
                        isOpen={isTermsModalOpen}
                        onClose={closeTermsModal}
                        title='Legal'
                        size='md'
                      >
                        <Stack spacing={4}>
                          <Text>
                            Read and accept our{' '}
                            <Link
                              href={NFT_LEGAL_URL}
                              fontWeight='bold'
                              textDecoration='underline'
                              isExternal
                            >
                              NFT PURCHASE TERMS AND CONDITIONS AND PLATFORM TERMS OF USE
                            </Link>
                          </Text>
                          <Button
                            colorScheme='yellow'
                            size='lg'
                            width='full'
                            onClick={() => {
                              closeTermsModal()
                              openConnectModal()
                            }}
                          >
                            Accept
                          </Button>
                        </Stack>
                      </Modal>
                    </>
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
}
