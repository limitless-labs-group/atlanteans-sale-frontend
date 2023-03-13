import { AtlanteansAPI } from '@/apis'
import { SalePhase, TESTNET_CHAIN } from '@/constants'
import { getProvider } from '@/utils'
import { constants, Wallet } from 'ethers'

describe('AtlanteansAPI', () => {
  const provider = getProvider({ chain: TESTNET_CHAIN })
  const signer = new Wallet(process.env.TEST_WALLET_PRIVATE_KEY ?? '', provider)
  let message: string, messageSigned: string

  it('should fetch message to sign', async () => {
    message = await AtlanteansAPI.fetchMessageToSign(SalePhase.CLAIM)
    // console.log(`message: ${message}`)
    expect(message).toContain('Atlantis World')
  }, 15000)

  it('should fetch proof with signed message', async () => {
    messageSigned = await signer.signMessage(message)
    // console.log(`messageSigned: ${messageSigned}`)
    // console.log(`signer address: ${await signer.getAddress()}`)
    const proof = await AtlanteansAPI.fetchProof(SalePhase.CLAIM, message, messageSigned)
    // console.log(`proof: ${proof}`)
    expect(Array.isArray(proof) && proof.length > 0).toBeTruthy
  }, 15000)

  it('should fetch signature', async () => {
    const signature = await AtlanteansAPI.fetchSignature(SalePhase.CLAIM, message, messageSigned)
    // console.log(`signature: ${signature}`)
    expect(signature).not.toBeUndefined
    expect(signature).not.toContain(constants.HashZero)
  }, 15000)
})
