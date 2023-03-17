import { SalePhase } from '@/constants/sale'

export const SALE_PHASE_HEADER_TITLE: { [salePhace in SalePhase]: string } = {
  [SalePhase.WL]: '',
  [SalePhase.DA]: 'Dutch Auction',
  [SalePhase.PUBLIC]: '',
  [SalePhase.CLAIM]: 'Founding Atlanteans Claim',
}
export const SALE_PHASE_HEADER_SUBTITLE: { [salePhace in SalePhase]: string } = {
  [SalePhase.WL]: ``,
  [SalePhase.DA]: `True last-price dutch auction, meaning that if a user mints at 0.1420, but the collection sells out at a price point of 0.069ETH,or any other arbitrary price interval, all users will get the same price & be refunded any additional ETH.`,
  [SalePhase.PUBLIC]: ``,
  [SalePhase.CLAIM]: `Founding Atlanteans (since before March 17) are eligible to mint 1 Atlantean character per scroll for free.`,
}
export const SALE_PHASE_NFT_INFO_TITLE: { [salePhace in SalePhase]: string } = {
  [SalePhase.WL]: 'ATLANTEAN NFT',
  [SalePhase.DA]: 'ATLANTEAN NFT',
  [SalePhase.PUBLIC]: 'ATLANTEAN NFT',
  [SalePhase.CLAIM]: 'Claim Your Atlantean',
}
export const SALE_PHASE_NFT_INFO_SUBTITLE: { [salePhace in SalePhase]: string } = {
  [SalePhase.WL]:
    'Founding Atlanteans, some partner communities & selected Pre-mint winners are able to mint up to 2 NFTs per wallet, at a price of 0.05ETH.',
  [SalePhase.DA]:
    'True last-price dutch auction, meaning that if a user mints at 0.1420, but the collection sells out at a price point of 0.069ETH, or any other arbitrary price interval, all users will get the same price & be refunded any additional ETH.',
  [SalePhase.PUBLIC]: '',
  [SalePhase.CLAIM]: 'You can claim as many free characters as a number of scrolls you own.',
}
