import React, { useEffect, useState } from 'react'
import { MintLayout } from '@/components'
import { MintPageHeader, MintPageNft } from '@/components/pages'

const MintPage = () => {
  // const [quantity, setQuantity] = useState(1)

  // useEffect(() => {
  //   if (quantity === Number(process.env.NEXT_PUBLIC_MAGIC_PLEASURE_NUMBER)) {
  //     window?.scrollTo({ top: 0, behavior: 'smooth' })
  //   }
  // }, [quantity])

  return (
    <MintLayout>
      <MintPageHeader />
      <MintPageNft />
    </MintLayout>
  )
}

export default MintPage
