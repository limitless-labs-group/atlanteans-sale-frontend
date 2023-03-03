// import { useMutation } from '@tanstack/react-query'
// import { useToast } from '@/hooks/ui'
// import { useAtlanteansSale, useLogger, useServerlessApi } from '@/hooks/instances'

export const useClaimSummon = () => {
  // const log = useLogger(useClaimSummon.name)
  // const toast = useToast()
  // const atlanteansSale = useAtlanteansSale()
  // const serverlessApi = useServerlessApi()
  // return useMutation(
  //   [atlanteansSale.claimSummon.name],
  //   async () => {
  //     const {
  //       data: { message: signingMessage, value },
  //     } = await serverlessApi.get('/atlanteans/merkle/signing-message/claimlist')
  //     const signature = await atlanteansSale.signer.signMessage(signingMessage)
  //     const nonce = await atlanteansSale.signer.getTransactionCount()
  //     const {
  //       data: { proof },
  //     } = await serverlessApi.post(`/atlanteans/merkle/proof/claimlist`, {
  //       digest: value,
  //       signature,
  //     })
  //     return await atlanteansSale.claimSummon(proof, {
  //       gasLimit: 1_000_000,
  //       nonce,
  //     })
  //   },
  //   {
  //     cacheTime: 0,
  //     onError(error: any, variables, context) {
  //       log.error({ error, variables, context })
  //       toast({
  //         id: useClaimSummon.name,
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
  //         id: useClaimSummon.name,
  //         status: 'success',
  //         title: 'Success',
  //         description: data.hash,
  //       })
  //     },
  //   }
  // )
}
