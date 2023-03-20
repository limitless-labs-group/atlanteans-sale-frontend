import React, { useCallback, useState } from 'react'
import { MintLayout, MintSection, SaleHeader } from '@/components'
import { SalePhase } from '@/constants'
import { useClaim, useClaimState } from '@/hooks'

const ClaimPage = () => {
  /**
   * state
   */
  const salePhase = SalePhase.CLAIM
  const { isClaimActive, claimStartTimestamp, claimEndTimestamp, maxClaimQuantity } =
    useClaimState()

  /**
   * time
   */
  const timestampToDisplay = !isClaimActive ? claimStartTimestamp : claimEndTimestamp
  const timerSubtitleToDisplay = !isClaimActive ? 'Starting in:' : 'Ending in:'

  /**
   * quantity
   */
  const [quantity, setQuantity] = useState<number>(1)

  const onQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity)
  }, [])

  /**
   * claim: mutation, handlers
   */
  const { mutateAsync: claim } = useClaim()
  const onMintButtonClick = useCallback(() => {
    if (!quantity) {
      return
    }
    claim(quantity)
  }, [quantity])

  return (
    <MintLayout>
      <SaleHeader
        salePhase={salePhase}
        timerTimestamp={timestampToDisplay}
        timerSubtitle={timerSubtitleToDisplay}
      />
      <MintSection
        salePhase={salePhase}
        maxQuantity={4 ?? maxClaimQuantity}
        onQuantityChange={onQuantityChange}
        onMintButtonClick={onMintButtonClick}
      />
    </MintLayout>
  )
}

export default ClaimPage
