import { useStore } from '@/store'

export const useClaimState = () => {
  const { isClaimActive, claimStartTimestamp, claimEndTimestamp, maxClaimQuantity } = useStore()
  return {
    isClaimActive,
    claimStartTimestamp,
    claimEndTimestamp,
    maxClaimQuantity,
  }
}
