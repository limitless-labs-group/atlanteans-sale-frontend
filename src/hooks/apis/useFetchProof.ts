import { AtlanteansAPI } from '@/apis'
import { SalePhase } from '@/constants'
import { useLogger } from '@/hooks'
import { useMutation } from 'react-query'
import { useSigner } from 'wagmi'

interface IFetchProof {
  salePhase: SalePhase
}

export const useFetchProof = () => {
  const log = useLogger(useFetchProof.name)

  const { data: signer } = useSigner()

  const mutation = useMutation({
    mutationFn: async ({ salePhase }: IFetchProof) => {
      if (!signer) {
        return undefined
      }
      const message = await AtlanteansAPI.fetchMessageToSign(salePhase)
      const signature = await signer.signMessage(message) // waiting for user to sign msg in wallet
      const proof = await AtlanteansAPI.fetchProof(salePhase, message, signature)
      return proof
    },
    onError: (error: any, variables, context) => {
      log.error({ error, variables, context })
    },
    onSuccess: (data, variables, context) => {
      log.success({ data, variables, context })
    },
  })

  return mutation
}
