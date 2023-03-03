import { useAtlanteansSaleContract } from '@/contracts'
import { useLogger, useToast } from '@/hooks'
import { useMutation } from '@tanstack/react-query'

interface IMintWithAuctionBid {
  tokenAmount: number
}

export const useMintWithAuctionBid = () => {
  const log = useLogger(useMintWithAuctionBid.name)
  const toast = useToast()
  const atlanteansSaleContract = useAtlanteansSaleContract()

  const mutation = useMutation({
    mutationFn: async ({ tokenAmount }: IMintWithAuctionBid) => {
      const nonce = await atlanteansSaleContract.signer.getTransactionCount()
      const currentAuctionBidPrice = await atlanteansSaleContract.currentDaPrice()
      const totalBidPrice = currentAuctionBidPrice.mul(tokenAmount)

      const tx = await atlanteansSaleContract['bidSummon(uint256)'](tokenAmount, {
        value: totalBidPrice,
        gasLimit: 1_000_000,
        nonce,
      })

      return tx
    },
    onError: (error: any, variables, context) => {
      log.error({ error, variables, context })
      // toast.close(useBidSummon.name);
      toast({
        id: useMintWithAuctionBid.name,
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
      toast.close(useMintWithAuctionBid.name)
      toast({
        id: useMintWithAuctionBid.name,
        status: 'success',
        title: 'Success',
        description: data.hash,
      })
    },
  })

  return mutation
}
