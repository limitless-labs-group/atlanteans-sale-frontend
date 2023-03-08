import { AtlanteansAPI } from '@/apis'
import { SalePhase, TESTNET_CHAIN } from '@/constants'
import { getProvider } from '@/utils'
import { Bytes, Wallet } from 'ethers'

describe('AtlanteansAPI', () => {
  const provider = getProvider({ chain: TESTNET_CHAIN })
  const signer = new Wallet(process.env.TEST_WALLET_PRIVATE_KEY ?? '', provider)
  let message: string | Bytes, hash: string

  it('should fetch message to sign', async () => {
    const data = await AtlanteansAPI.fetchMessageToSign(SalePhase.CLAIM)
    message = data.message
    hash = data.hash
    console.log(`message: ${message}`)
    console.log(`hash: ${hash}`)
    expect(message).toContain('Atlantis World')
  })

  it('should fetch proof with signature', async () => {
    const signature = await signer.signMessage(message)
    console.log(`signature: ${signature}`)
    console.log(`signer address: ${await signer.getAddress()}`)
    const proof = await AtlanteansAPI.fetchProof(SalePhase.CLAIM, hash, signature)
    console.log(`proof: ${proof}`)
    expect(Array.isArray(proof)).toBeTruthy()
  })
})
