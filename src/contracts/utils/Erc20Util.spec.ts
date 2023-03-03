import { Erc20Util } from '@/contracts'
import { Wallet } from 'ethers'

describe('Erc20Util', () => {
  const tokenAddress = '0x4200000000000000000000000000000000000042' // Optimism mainnet OP token
  const MaxSchnaider = '0xb1D7daD6baEF98df97bD2d3Fb7540c08886e0299'
  const spender = '0x660FBab221eCD6F915a2b10e91471E7315A9FEC4'
  const signer = new Wallet(process.env.PRIVATE_KEY ?? '')

  it('should return correct erc20 instance', async () => {
    const erc20Contract = Erc20Util.getContract(tokenAddress)
    expect(erc20Contract.address).toBe(tokenAddress)
  })

  it('should return balance of account', async () => {
    const balance = await Erc20Util.fetchBalanceOf(MaxSchnaider, tokenAddress)
    // console.log(`Balance: ${balance} ${token.symbol}`)
    expect(balance).toBeGreaterThanOrEqual(0)
  })

  it('should return allowance for spender', async () => {
    const allowance = await Erc20Util.fetchAllowance(MaxSchnaider, spender, tokenAddress)
    // console.log(`Allowance: ${allowance} ${token.symbol}`)
    expect(allowance).toBeGreaterThanOrEqual(0)
  })

  it.skip('should approve spender for new allowance', async () => {
    const currentAllowance = await Erc20Util.fetchAllowance(MaxSchnaider, spender, tokenAddress)
    const approveTx = await Erc20Util.approve(
      spender,
      currentAllowance.add(1),
      tokenAddress,
      signer
    )
    const receipt = await approveTx.wait()
    expect(receipt.status).toBe(1)

    const newAllowance = await Erc20Util.fetchAllowance(MaxSchnaider, spender, tokenAddress)
    // console.log(`New allowance: ${newAllowance} ${token.symbol}`)
    expect(newAllowance.gt(currentAllowance)).toBe(true)
  }, 30000)
})
