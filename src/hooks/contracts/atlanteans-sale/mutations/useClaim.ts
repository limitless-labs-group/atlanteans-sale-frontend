import { useToast, useLogger, useNetwork, useEncodedArgs } from '@/hooks'
import { AtlanteansSaleUtil } from '@/contracts'
import { useAccount, useMutation, useQueryClient, useSigner } from 'wagmi'
import { SalePhase } from '@/constants'

/**
 * * Phase 4: free claim for Founding Atlanteans (who are allowed via merkle tree)
 */
export const useClaim = () => {
  const log = useLogger(useClaim.name)
  const toast = useToast()

  const queryCient = useQueryClient()

  const { isActiveChainSupported, activeChain } = useNetwork()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { mutateAsync: fetchEncodedArgs } = useEncodedArgs()

  const mutation = useMutation({
    mutationFn: async (quantity: number) => {
      if (!isActiveChainSupported || !signer) {
        // TODO: toast error
        return
      }

      const encodedArgsResponse = await fetchEncodedArgs({ salePhase: SalePhase.CLAIM, quantity })

      if (!encodedArgsResponse?.signature) {
        // TODO: toast error
        return
      }

      const { tx, error } = await AtlanteansSaleUtil.claim({
        address,
        chainId: activeChain?.id,
        signer,
        signature: encodedArgsResponse?.signature ?? '0x',
        scrollsAmount: encodedArgsResponse.scrollsAmount ?? 0,
        quantity,
      })
      console.log('error', error)

      // TODO: toast error
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
      if (!data) {
        log.error({ data, variables, context })
        toast({
          id: useClaim.name,
          status: 'error',
          title: 'Error',
          description: data || 'unexpected error occurred',
        })
        return
      }

      // * refetching claim state
      queryCient.invalidateQueries(['claim-state-query', address])

      log.success({ data, variables, context })
      toast({
        id: useClaim.name,
        status: 'success',
        title: 'Success',
        description: data?.hash,
      })
    },
  })

  return mutation
}
