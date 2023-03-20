import { useClaimStateQuery } from '@/hooks'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

interface IStore {
  isClaimActive?: boolean
  claimStartTimestamp?: number
  claimEndTimestamp?: number
  maxClaimQuantity?: number
}

const Store = createContext<IStore>({})
export const StoreProvider = ({ children }: PropsWithChildren) => {
  /**
   * claim
   */
  const { data: claimState } = useClaimStateQuery()
  const { claimStartTimestamp, claimEndTimestamp, maxClaimQuantity } = claimState ?? {}
  const [isClaimActive, setIsClaimActive] = useState(false)

  /**
   * interval to refresh sale phases state
   */
  useEffect(() => {
    const refreshIsClaimActive = () => {
      const now = Date.now()
      if (Number(claimStartTimestamp) < now && Number(claimEndTimestamp) > now) {
        setIsClaimActive(true)
      } else {
        setIsClaimActive(false)
      }
    }
    const interval = setInterval(() => refreshIsClaimActive(), 1000)
    return () => clearInterval(interval)
  }, [claimStartTimestamp, claimEndTimestamp])

  const storeState = {
    isClaimActive,
    claimStartTimestamp,
    claimEndTimestamp,
    maxClaimQuantity,
  }

  return <Store.Provider value={storeState}>{children}</Store.Provider>
}

export const useStore = () => useContext(Store)
