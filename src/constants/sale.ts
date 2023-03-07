export enum SALE_PHASE {
  WL = 'mintlist',
  DA = 'dutch-auction',
  PUBLIC = 'public',
  CLAIM = 'claimlist',
}

export const MINT_LIMIT_TOTAL: { [salePhase in SALE_PHASE]?: number } = {
  [SALE_PHASE.WL]: 2,
  [SALE_PHASE.CLAIM]: 1,
}

export const MINT_LIMIT_PER_TX: { [salePhase in SALE_PHASE]?: number } = {
  [SALE_PHASE.WL]: MINT_LIMIT_TOTAL[SALE_PHASE.WL],
  [SALE_PHASE.DA]: 19,
  [SALE_PHASE.PUBLIC]: 19,
  [SALE_PHASE.CLAIM]: MINT_LIMIT_TOTAL[SALE_PHASE.CLAIM],
}

export const MINT_GAS_LIMIT = 1_000_000
