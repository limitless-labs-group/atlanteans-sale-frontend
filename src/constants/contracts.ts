import { MAINNET_CHAIN, SupportedChainId, TESTNET_CHAIN } from '@/constants'
import { getAddress } from 'ethers/lib/utils.js'
import { Address } from 'wagmi'

export const ATLANTEANS_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0x94ec741872023A451886de48E0Dee3BDD24e7FB1',
  [MAINNET_CHAIN?.id]: getAddress('0x47691834Cbb96Ce5fBCd1c82f3804fBA63460370'),
}

export const ATLANTEANS_SALE_CONTRACT_ADDRESS: { [chainId in SupportedChainId]: Address } = {
  [TESTNET_CHAIN?.id]: '0xaAf32340B7257947FE878f651D72aF34d953c0D6',
  [MAINNET_CHAIN?.id]: getAddress('0x3c800c367E75ce460287CEE10DB0B2C6e7C894f3'),
}
