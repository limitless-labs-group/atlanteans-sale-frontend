import { AtlanteansAPI } from '@/apis'
import { SalePhase, TESTNET_CHAIN } from '@/constants'
import { getProvider } from '@/utils'
import { Wallet } from 'ethers'

describe('AtlanteansAPI', () => {
  const provider = getProvider({ chain: TESTNET_CHAIN })
  const signer = new Wallet(process.env.TEST_WALLET_PRIVATE_KEY ?? '', provider)
  let message: string

  it('should fetch message to sign', async () => {
    message = await AtlanteansAPI.fetchMessageToSign(SalePhase.CLAIM)
    console.log(`message: ${message}`)
    expect(message).toContain('Atlantis World')
  }, 15000)

  it('should fetch proof with signature', async () => {
    const signature = await signer.signMessage(message)
    // console.log(`signature: ${signature}`)
    // console.log(`signer address: ${await signer.getAddress()}`)
    const proof = await AtlanteansAPI.fetchProof(SalePhase.CLAIM, message, signature)
    console.log(`proof: ${proof}`)
    expect(Array.isArray(proof) && proof.length > 0).toBeTruthy
  }, 15000)
})
