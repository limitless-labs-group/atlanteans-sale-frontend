import { useAtlanteansSaleContract } from '@/contracts'
import { useLogger, useToast } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

interface IMintPublic {
  tokenAmount: number
}

/**
 * ! Phase 3: Public (paid)
 * TODO: replace bidSummon with publicSummon once contract is ready
 */
export const useMintPublic = () => {
  const log = useLogger(useMintPublic.name)
  const toast = useToast()
  const atlanteansSaleContract = useAtlanteansSaleContract()

  const mutation = useMutation({
    mutationFn: async ({ tokenAmount }: IMintPublic) => {
      const nonce = await atlanteansSaleContract.signer.getTransactionCount()
      const tokenPrice = await atlanteansSaleContract.finalPrice()
      const totalPrice = tokenPrice.mul(tokenAmount)

      const tx = await atlanteansSaleContract['bidSummon(uint256)'](tokenAmount, {
        value: totalPrice,
        gasLimit: 1_000_000,
        nonce,
      })

      return tx
    },
    onError: (error: any, variables, context) => {
      log.error({ error, variables, context })
      // toast.close(useBidSummon.name);
      toast({
        id: useMintPublic.name,
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
      toast.close(useMintPublic.name)
      toast({
        id: useMintPublic.name,
        status: 'success',
        title: 'Success',
        description: data.hash,
      })
    },
  })

  return mutation
}
