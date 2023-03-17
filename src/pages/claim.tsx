import React, { useCallback, useState } from 'react'
import { MintLayout } from '@/components'
import { MintPageHeader, MintPageNft } from '@/components/pages'
import { SalePhase } from '@/constants'
import { useClaim } from '@/hooks'

const ClaimPage = () => {
  const salePhase = SalePhase.CLAIM

  const [quantity, setQuantity] = useState(1)

  const { mutateAsync: claim } = useClaim()

  const onMintButtonClick = useCallback(() => {
    claim(quantity)
  }, [quantity])

  return (
    <MintLayout>
      <MintPageHeader salePhase={salePhase} />
      <MintPageNft
        salePhase={salePhase}
        quantity={quantity}
        onQuantityChange={(newQuantity) => setQuantity(Number(newQuantity))}
        onMintButtonClick={onMintButtonClick}
      />
    </MintLayout>
  )
}

export default ClaimPage
