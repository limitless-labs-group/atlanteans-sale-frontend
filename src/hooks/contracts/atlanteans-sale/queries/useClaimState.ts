import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { constants } from 'ethers'
import { useAccount, useQuery } from 'wagmi'

export const useClaimState = () => {
  const log = useLogger(useClaimState.name)

  const contract = useAtlanteansSaleContract()
  const { address } = useAccount()

  const query = useQuery(['claim-info-query'], {
    queryFn: async () => {
      await Promise.all([
        contract.claimsStarted(),
        contract.claimsStartTime(),
        contract.claimsEnded(),
        contract.claimsEndTime(),
        contract.faToRemainingClaim(address ?? constants.AddressZero),
      ])
    },
    onError: (error) => {
      log.error({ error })
    },
    onSuccess: (data) => {
      log.success({ data })
    },
  })

  return query
}
