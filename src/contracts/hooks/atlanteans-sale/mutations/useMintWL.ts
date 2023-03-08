import { useMutation } from '@tanstack/react-query'
import { useLogger, useNetwork, useToast } from '@/hooks'
import { AtlanteansSaleUtil } from '@/contracts'
import { useSigner } from 'wagmi'

/**
 * * Phase 1: Whitelist (paid)
 */
export const useMintWL = () => {
  const log = useLogger(useMintWL.name)
  const toast = useToast()

  const { isActiveChainSupported } = useNetwork()
  const { data: signer } = useSigner()

  const mutation = useMutation({
    mutationFn: async (tokenAmount: number) => {
      if (!isActiveChainSupported || !signer) {
        return
      }
      const { tx, error } = await AtlanteansSaleUtil.mintWL(signer, tokenAmount)
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
        description: data?.hash,
      })
    },
  })

  return mutation
}
