import { useMutation } from '@tanstack/react-query'
import { useLogger, useToast } from '@/hooks'
import { useAtlanteansSaleContract } from '@/contracts'
import { AtlanteansApi } from '@/apis'

/**
 * ! Phase 1: Whitelist (paid)
 */
export const useMintWL = () => {
  const log = useLogger(useMintWL.name)
  const toast = useToast()
  const atlanteansSaleContract = useAtlanteansSaleContract()

  const mutation = useMutation({
    mutationFn: async () => {
      const { message, digest } = await AtlanteansApi.fetchWLMessageToSign()
      const signature = await atlanteansSaleContract.signer.signMessage(message)
      const nonce = await atlanteansSaleContract.signer.getTransactionCount()
      const proof = await AtlanteansApi.fetchWLProof(digest, signature)

      const tokenPrice = await atlanteansSaleContract.finalPrice()

      const tx = await atlanteansSaleContract['mintlistSummon(bytes32[])'](proof, {
        value: tokenPrice,
        gasLimit: 1_000_000,
        nonce,
      })

      return tx
    },
    onError: (error: any, variables, context) => {
      log.error({ error, variables, context })
      toast({
        id: useMintWL.name,
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
        id: useMintWL.name,
        status: 'success',
        title: 'Success',
        description: data.hash,
      })
    },
  })

  return mutation
}
