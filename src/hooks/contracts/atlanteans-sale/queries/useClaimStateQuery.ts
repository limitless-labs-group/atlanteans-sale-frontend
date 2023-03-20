import { useLogger, useAtlanteansSaleContract } from '@/hooks'
import { constants } from 'ethers'
import { useAccount, useQuery } from 'wagmi'

export const useClaimStateQuery = () => {
  const log = useLogger(useClaimStateQuery.name)

  const contract = useAtlanteansSaleContract()
  const { address } = useAccount()

  const query = useQuery(['claim-state-query', address], {
    queryFn: async () => {
      const [claimsStarted, claimsStartTime, claimsEnded, claimsEndTime, faToRemainingClaim] =
        await Promise.all([
          contract.claimsStarted(),
          contract.claimsStartTime(),
          contract.claimsEnded(),
          contract.claimsEndTime(),
          contract.faToRemainingClaim(address ?? constants.AddressZero),
        ])
      const claimStartTimestamp = claimsStartTime.toNumber() * 1000
      const claimEndTimestamp = claimsEndTime.toNumber() * 1000
      const maxClaimQuantity = faToRemainingClaim.toNumber()
      return {
        claimsStarted,
        claimStartTimestamp,
        claimsEnded,
        claimEndTimestamp,
        maxClaimQuantity,
      }
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
