import { useMutation } from '@tanstack/react-query'
import { useToast, useLogger } from '@/hooks'
import { useAtlanteansSaleContract } from '@/contracts'
import { AtlanteansApi } from '@/apis'

/**
 * ! Phase 4: free claim for Founding Atlanteans (who are allowed via merkle tree)
 */
export const useClaim = () => {
  const log = useLogger(useClaim.name)
  const toast = useToast()
  const atlanteansSaleContract = useAtlanteansSaleContract()

  const mutation = useMutation({
    mutationFn: async () => {
      const { message, digest } = await AtlanteansApi.fetchClaimMessageToSign()
      const signature = await atlanteansSaleContract.signer.signMessage(message)
      const nonce = await atlanteansSaleContract.signer.getTransactionCount()
      const proof = await AtlanteansApi.fetchClaimProof(digest, signature)

      const tx = await atlanteansSaleContract.claimSummon(proof, {
        gasLimit: 1_000_000,
        nonce,
      })

      return tx
    },
    onError: (error: any, variables, context) => {
      log.error({ error, variables, context })
      toast({
        id: useClaim.name,
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
        id: useClaim.name,
        status: 'success',
        title: 'Success',
        description: data.hash,
      })
    },
  })

  return mutation
}
