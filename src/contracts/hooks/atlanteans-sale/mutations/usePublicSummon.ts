// import { useAtlanteansSale, useLogger } from '@/hooks/instances'
// import { BigNumberish } from 'ethers'
// import { useMutation } from '@tanstack/react-query'
// import { useToast } from '@/hooks/ui'

export const usePublicSummon = () => {
  // const log = useLogger(usePublicSummon.name)
  // const toast = useToast()
  // const atlanteansSale = useAtlanteansSale()
  // return useMutation(
  //   [atlanteansSale.publicSummon.name],
  //   async ({ numAtlanteans }: { numAtlanteans: BigNumberish }) => {
  //     const nonce = await atlanteansSale.signer.getTransactionCount()
  //     const finalPrice = await atlanteansSale.finalPrice()
  //     return atlanteansSale.publicSummon(numAtlanteans, {
  //       value: finalPrice,
  //       gasLimit: 1_000_000,
  //       nonce,
  //     })
  //   },
  //   {
  //     cacheTime: 0,
  //     onError(error: any, variables, context) {
  //       log.error({ error, variables, context })
  //       toast({
  //         id: usePublicSummon.name,
  //         status: 'error',
  //         title: error?.message ?? 'Error',
  //         description: error?.data?.message || 'unexpected error occurred',
  //       })
  //     },
  //     onMutate(variables) {
  //       log.verbose('ON_MUTATE', { variables })
  //     },
  //     onSettled(data, error, variables, context) {
  //       log.verbose('ON_SETTLED', { data, error, variables, context })
  //     },
  //     onSuccess(data, variables, context) {
  //       log.success({ data, variables, context })
  //       toast({
  //         id: usePublicSummon.name,
  //         status: 'success',
  //         title: 'Success',
  //         description: data.hash,
  //       })
  //     },
  //   }
  // )
}
