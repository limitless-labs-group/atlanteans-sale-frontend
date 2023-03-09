import { TESTNET_CHAIN, WETH } from '@/constants'
import { ERC20Util } from '@/contracts/utils/ERC20Util'
import { getProvider } from '@/utils'
import { utils, Wallet } from 'ethers'

describe('ERC20Util', () => {
  const token = WETH[TESTNET_CHAIN.id]
  const MaxSchnaider = '0xb1D7daD6baEF98df97bD2d3Fb7540c08886e0299'
  const spender = '0x660FBab221eCD6F915a2b10e91471E7315A9FEC4'
  const provider = getProvider({ chain: TESTNET_CHAIN })
  const signer = new Wallet(process.env.TEST_WALLET_PRIVATE_KEY ?? '', provider)

  it('should return correct Erc20 instance', async () => {
    const contract = ERC20Util.getContract({ address: token.address, signerOrProvider: provider })
    expect(contract.address).toBe(token.address)
  })

  it('should return balance of account', async () => {
    const { formatted: balance } = await ERC20Util.fetchBalanceOf(
      MaxSchnaider,
      token.address,
      provider
    )
    // console.log(`Balance: ${balance} ${token.symbol}`)
    expect(balance).toBeGreaterThanOrEqual(0)
  }, 10000)

  it('should return allowance for spender', async () => {
    const { formatted: allowance } = await ERC20Util.fetchAllowance(
      MaxSchnaider,
      spender,
      token.address,
      provider
    )
    // console.log(`Allowance: ${allowance} ${token.symbol}`)
    expect(allowance).toBeGreaterThanOrEqual(0)
  }, 10000)

  it.skip('should approve spender for new allowance', async () => {
    const { value: currentAllowance } = await ERC20Util.fetchAllowance(
      MaxSchnaider,
      spender,
      token.address,
      provider
    )
    const approveTx = await ERC20Util.approve(
      spender,
      currentAllowance.add(utils.parseUnits('1', token.decimals)),
      token.address,
      signer
    )
    const receipt = await approveTx.wait()
    expect(receipt.status).toBe(1)

    const { value: newAllowance } = await ERC20Util.fetchAllowance(
      MaxSchnaider,
      spender,
      token.address,
      provider
    )
    // console.log(`New allowance: ${newAllowance} ${token.symbol}`)
    expect(newAllowance.gt(currentAllowance)).toBe(true)
  }, 30000)
})
