import { AtlanteansSaleUtil } from '@/contracts'
import { useLogger, useNetwork, useToast } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { useSigner } from 'wagmi'

/**
 * * Phase 3: Public (paid)
 */
export const useMintPublic = () => {
  const log = useLogger(useMintPublic.name)
  const toast = useToast()

  const { isActiveChainSupported } = useNetwork()
  const { data: signer } = useSigner()

  const mutation = useMutation({
    mutationFn: async (tokenAmount: number) => {
      if (!isActiveChainSupported || !signer) {
        return
      }
      const tx = await AtlanteansSaleUtil.mintPublic(signer, tokenAmount)
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
        description: data?.hash,
      })
    },
  })

  return mutation
}
