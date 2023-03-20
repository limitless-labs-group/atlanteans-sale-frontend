import React from 'react'
import { MintLayout, MintSection, SaleHeader } from '@/components'
import { SalePhase } from '@/constants'

const MintPage = () => {
  // const [quantity, setQuantity] = useState(1)

  // useEffect(() => {
  //   if (quantity === Number(process.env.NEXT_PUBLIC_MAGIC_PLEASURE_NUMBER)) {
  //     window?.scrollTo({ top: 0, behavior: 'smooth' })
  //   }
  // }, [quantity])

  return (
    <MintLayout>
      <SaleHeader salePhase={SalePhase.DA} />
      <MintSection salePhase={SalePhase.DA} />
    </MintLayout>
  )
}

export default MintPage
