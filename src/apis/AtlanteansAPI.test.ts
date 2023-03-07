import { AtlanteansAPI } from '@/apis'
import { SALE_PHASE } from '@/constants'
import { Bytes, Wallet } from 'ethers'

describe('AtlanteansAPI', () => {
  const signer = new Wallet(process.env.TEST_WALLET_PRIVATE_KEY ?? '')
  let message: string | Bytes, digest: number

  it('should fetch message to sign', async () => {
    const data = await AtlanteansAPI.fetchMessageToSign(SALE_PHASE.CLAIM)
    message = data.message
    digest = data.digest
    console.log(`message: ${message}`)
    console.log(`digest: ${digest}`)
    expect(message).toBe('')
  })

  it('should fetch proof with signature', async () => {
    const signature = await signer.signMessage(message)
    const proof = await AtlanteansAPI.fetchProof(SALE_PHASE.CLAIM, digest, signature)
    console.log(`proof: ${proof}`)
    expect(proof.length).toBeGreaterThan(0)
  })
})
