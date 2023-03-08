export enum SalePhase {
  WL = 'mintlist',
  DA = 'da',
  PUBLIC = 'public',
  CLAIM = 'claimlist',
}

export const MINT_LIMIT_TOTAL = Object.freeze({
  [SalePhase.WL]: 2,
  [SalePhase.CLAIM]: 1,
})

export const MINT_LIMIT_PER_TX = Object.freeze({
  [SalePhase.WL]: MINT_LIMIT_TOTAL[SalePhase.WL],
  [SalePhase.DA]: 19,
  [SalePhase.PUBLIC]: 19,
  [SalePhase.CLAIM]: MINT_LIMIT_TOTAL[SalePhase.CLAIM],
})

export const MINT_GAS_LIMIT = 1_000_000
