import { useLogger, useNetwork, useToast } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useSigner } from 'wagmi'
import { AtlanteansSaleUtil } from '@/contracts'

/**
 * * Phase 2: Dutch Auction (paid)
 */
export const useMintDA = () => {
  const log = useLogger(useMintDA.name)
  const toast = useToast()

  const { isActiveChainSupported } = useNetwork()
  const { data: signer } = useSigner()

  const mutation = useMutation({
    mutationFn: async (tokenAmount: number) => {
      if (!isActiveChainSupported || !signer) {
        // TODO: toast error
        return
      }

      const { tx, error } = await AtlanteansSaleUtil.mintDA({ signer, tokenAmount })
      // TODO: toast error
      return tx
    },
    onError: (error: any, variables, context) => {
      log.error({ error, variables, context })
      // toast.close(useBidSummon.name);
      toast({
        id: useMintDA.name,
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
      toast.close(useMintDA.name)
      toast({
        id: useMintDA.name,
        status: 'success',
        title: 'Success',
        description: data?.hash,
      })
    },
  })

  return mutation
}
