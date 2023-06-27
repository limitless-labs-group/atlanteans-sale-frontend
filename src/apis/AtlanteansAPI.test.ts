import { AtlanteansAPI } from '@/apis'
import { SalePhase, TESTNET_CHAIN } from '@/constants'
import { getProvider } from '@/utils'
import { constants, Wallet } from 'ethers'

describe('AtlanteansAPI', () => {
  const provider = getProvider({ chain: TESTNET_CHAIN })
  const signer = new Wallet(process.env.TEST_WALLET_PRIVATE_KEY ?? '', provider)

  it('should fetch message to sign', async () => {
    const message = await AtlanteansAPI.fetchMessageToSign(SalePhase.WL)
    // console.log(`message: ${message}`)
    // console.log(`messageSigned: ${messageSigned}`)
    expect(message).toContain('Atlantis World')
  }, 15000)

  it('should fetch proof', async () => {
    const message = await AtlanteansAPI.fetchMessageToSign(SalePhase.WL)
    const messageSigned = await signer.signMessage(message)
    const proof = await AtlanteansAPI.fetchProof(SalePhase.WL, message, messageSigned)
    // console.log(`proof: ${proof}`)
    expect(Array.isArray(proof) && proof.length > 0).toBeTruthy()
  }, 15000)

  it('should fetch signature', async () => {
    const message = await AtlanteansAPI.fetchMessageToSign(SalePhase.CLAIM)
    const messageSigned = await signer.signMessage(message)
    const encodedArgsResponse = await AtlanteansAPI.fetchEncodedArgs(
      SalePhase.CLAIM,
      message,
      messageSigned
    )
    // console.log(`signature: ${signature}`)
    expect(
      encodedArgsResponse !== undefined &&
        !encodedArgsResponse.signature?.includes(constants.HashZero)
    ).toBeTruthy()
  }, 15000)
})
