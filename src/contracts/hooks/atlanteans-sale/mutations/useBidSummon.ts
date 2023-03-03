// import { useAtlanteansSaleContract } from '@/contracts'
// import { useLogger } from '@/hooks'
// import { BigNumberish } from 'ethers'
// import { useMutation } from '@tanstack/react-query'
// import { useToast } from '@/hooks/ui'

export const useBidSummon = () => {
  // const log = useLogger(useBidSummon.name)
  // const toast = useToast()
  // const atlanteansSale = useAtlanteansSaleContract()
  // return useMutation(
  //   [atlanteansSale.bidSummon.name],
  //   async ({ numAtlanteans }: { numAtlanteans: BigNumberish }) => {
  //     const nonce = await atlanteansSale.signer.getTransactionCount()
  //     const daPrice = await atlanteansSale.currentDaPrice()
  //     return await atlanteansSale.bidSummon(numAtlanteans, {
  //       value: daPrice,
  //       gasLimit: 1_000_000,
  //       nonce,
  //     })
  //   },
  //   {
  //     cacheTime: 0,
  //     onError(error: any, variables, context) {
  //       log.error({ error, variables, context })
  //       // toast.close(useBidSummon.name);
  //       toast({
  //         id: useBidSummon.name,
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
  //       toast.close(useBidSummon.name)
  //       toast({
  //         id: useBidSummon.name,
  //         status: 'success',
  //         title: 'Success',
  //         description: data.hash,
  //       })
  //     },
  //   }
  // )
}
