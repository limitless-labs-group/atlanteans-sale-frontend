import {
  MINT_LIMIT_TOTAL,
  SalePhase,
  ATLANTEANS_SALE_CONTRACT_ADDRESS,
  TESTNET_CHAIN,
} from '@/constants'
import { AtlanteansSale } from '@/contracts/types'
import { AtlanteansSaleUtil, MintError } from '@/contracts/utils/AtlanteansSaleUtil'
import { getProvider } from '@/utils'
import { Wallet } from 'ethers'

describe('AtlanteansSaleUtil', () => {
  const provider = getProvider({ chain: TESTNET_CHAIN })
  const signer = new Wallet(process.env.TEST_WALLET_PRIVATE_KEY ?? '', provider)
  const MaxSchnaider = '0xb1D7daD6baEF98df97bD2d3Fb7540c08886e0299'
  let contract: AtlanteansSale
  // proof for WL
  const proof = [
    '0x7928da0aaeaf0f411e6b271d26aefd8c05e36545bdf24e51436ed472910a7286',
    '0x070e8db97b197cc0e4a1790c5e6c3667bab32d733db7f815fbe84f5824c7168d',
    '0x1d2c6d0de38c77d2a15f6d241121ec032404625e87566d8a742d3dc2f924263d',
  ]
  // signature for CLAIM
  const signature = ''

  const itif = (condition: boolean) => (condition ? it : it.skip)

  it('should return correct AtlanteansSale contract instance', async () => {
    contract = AtlanteansSaleUtil.getContract({
      chainId: TESTNET_CHAIN.id,
      signerOrProvider: provider,
    })
    expect(contract.address).toBe(ATLANTEANS_SALE_CONTRACT_ADDRESS[TESTNET_CHAIN.id])
    const finalPrice = await contract.finalPrice()
    // console.log(utils.formatEther(finalPrice))
    expect(finalPrice.gt(0)).toBeTruthy()
  })

  // describe('whitelist', () => {
  //   let hasWLStarted = false,
  //     hasWLEnded = false,
  //     wlMintedAmount = -1,
  //     canMint = wlMintedAmount < MINT_LIMIT_TOTAL[SalePhase.WL]

  //   it('should fetch WL token amount minted by user', async () => {
  //     wlMintedAmount = await AtlanteansSaleUtil.wlMintedAmount(MaxSchnaider, TESTNET_CHAIN.id)
  //     expect(wlMintedAmount).toBeGreaterThanOrEqual(0)
  //   })

  //   itif(!hasWLStarted)('should revert WL mint if phase has not started', async () => {
  //     const { error } = await AtlanteansSaleUtil.claim({ signer, quantity: 1, signature })
  //     expect(error).toBe(MintError.PHASE_NOT_STARTED)
  //   })

  //   itif(hasWLEnded)('should revert WL mint if phase has ended', async () => {
  //     const { error } = await AtlanteansSaleUtil.claim({ signer, proof })
  //     expect(error).toBe(MintError.PHASE_ENDED)
  //   })

  //   itif(canMint && hasWLStarted && !hasWLEnded)(
  //     'should WL mint',
  //     async () => {
  //       wlMintedAmount = await AtlanteansSaleUtil.wlMintedAmount(MaxSchnaider, TESTNET_CHAIN.id)
  //       const { tx } = await AtlanteansSaleUtil.mintWL({ signer, proof })
  //       const receipt = await tx?.wait()
  //       expect(receipt?.status).toBe(1)
  //       const newWlMintedAmount = await AtlanteansSaleUtil.wlMintedAmount(
  //         MaxSchnaider,
  //         TESTNET_CHAIN.id
  //       )
  //       expect(newWlMintedAmount).toBeGreaterThan(wlMintedAmount)
  //     },
  //     30000
  //   )

  // itif(hasClaimed)('should revert WL mint if already minted max amount', async () => {
  //   const { error } = await AtlanteansSaleUtil.claim({ signer, proof })
  //   expect(error).toBe(MintError.ALREADY_MINTED)
  // })
  // })

  describe('claim', () => {
    let hasClaimStarted = false,
      hasClaimEnded = false,
      hasClaimed = false

    itif(!hasClaimStarted)('should revert claim if phase has not started', async () => {
      const { error } = await AtlanteansSaleUtil.claim({ signer, quantity: 1, signature })
      expect(error).toBe(MintError.PHASE_NOT_STARTED)
    })

    itif(hasClaimEnded)('should revert claim if phase has ended', async () => {
      const { error } = await AtlanteansSaleUtil.claim({ signer, quantity: 1, signature })
      expect(error).toBe(MintError.PHASE_ENDED)
    })

    itif(!hasClaimed && hasClaimStarted && !hasClaimEnded)(
      'should claim for the first time',
      async () => {
        const maxQuantityToClaim = await contract.faToRemainingClaim(MaxSchnaider)
        const { tx } = await AtlanteansSaleUtil.claim({ signer, quantity: 1, signature })
        const receipt = await tx?.wait()
        expect(receipt?.status).toBe(1)
        const quantityRemaining = await contract.faToRemainingClaim(MaxSchnaider)
        hasClaimed = quantityRemaining.lt(maxQuantityToClaim)
        expect(hasClaimed).toBeTruthy
      },
      30000
    )

    itif(hasClaimed)('should revert claim if already claimed', async () => {
      const { error } = await AtlanteansSaleUtil.claim({ signer, quantity: 1, signature })
      expect(error).toBe(MintError.ALREADY_MINTED)
    })
  })
})
