import { useMutation } from '@tanstack/react-query'
import { useToast, useLogger } from '@/hooks'
import { useAtlanteansSaleContract } from '@/contracts'

/**
 * Keys & Scrolls holders who burned their scrolls are allowed to claim a charcter for free
 */
export const useMintWithFreeClaim = () => {
  const log = useLogger(useMintWithFreeClaim.name)
  const toast = useToast()
  const atlanteansSaleContract = useAtlanteansSaleContract()
  // const serverlessApi = useServerlessApi()

  const mutations = useMutation({
    mutationFn: async () => {
      // const {
      //   data: { message: signingMessage, value },
      // } = await serverlessApi.get('/atlanteans/merkle/signing-message/claimlist')
      // const signature = await atlanteansSale.signer.signMessage(signingMessage)
      const nonce = await atlanteansSaleContract.signer.getTransactionCount()

      // const {
      //   data: { proof },
      // } = await serverlessApi.post(`/atlanteans/merkle/proof/claimlist`, {
      //   digest: value,
      //   signature,
      // })

      const tx = await atlanteansSaleContract.claimSummon(['proof'], {
        gasLimit: 1_000_000,
        nonce,
      })

      return tx
    },
    onError: (error: any, variables, context) => {
      log.error({ error, variables, context })
      toast({
        id: useMintWithFreeClaim.name,
        status: 'error',
        title: error?.message ?? 'Error',
        description: error?.data?.message || 'unexpected error occurred',
      })
    },
    onMutate: (variables) => {
      log.verbose('ON_MUTATE', { variables })
    },
    onSettled: (data, error, variables, context) => {
      log.verbose('ON_SETTLED', { data, error, variables, context })
    },
    onSuccess: (data, variables, context) => {
      log.success({ data, variables, context })
      toast({
        id: useMintWithFreeClaim.name,
        status: 'success',
        title: 'Success',
        description: data.hash,
      })
    },
  })

  return mutations
}
