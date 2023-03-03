// import { useMutation } from '@tanstack/react-query'
// import { useToast } from '@/hooks/ui'
// import { useAtlanteansSale, useServerlessApi, useLogger } from '@/hooks/instances'

export const useMintlistSummon = () => {
  // const log = useLogger(useMintlistSummon.name)
  // const toast = useToast()
  // const atlanteansSale = useAtlanteansSale()
  // const serverlessApi = useServerlessApi()
  // return useMutation(
  //   [atlanteansSale.bidSummon.name],
  //   async () => {
  //     const {
  //       data: { message: signingMessage, value },
  //     } = await serverlessApi.get('/atlanteans/merkle/signing-message/mintlist')
  //     const signature = await atlanteansSale.signer.signMessage(signingMessage)
  //     const nonce = await atlanteansSale.signer.getTransactionCount()
  //     const {
  //       data: { proof },
  //     } = await serverlessApi.post(`/atlanteans/merkle/proof/mintlist`, {
  //       digest: value,
  //       signature,
  //     })
  //     const finalPrice = await atlanteansSale.finalPrice()
  //     return await atlanteansSale.mintlistSummon(proof, {
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
  //         id: useMintlistSummon.name,
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
  //         id: useMintlistSummon.name,
  //         status: 'success',
  //         title: 'Success',
  //         description: data.hash,
  //       })
  //     },
  //   }
  // )
}
