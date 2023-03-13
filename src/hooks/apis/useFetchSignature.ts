import { AtlanteansAPI } from '@/apis'
import { SalePhase } from '@/constants'
import { useLogger } from '@/hooks'
import { useMutation } from 'react-query'
import { useSigner } from 'wagmi'

interface IFetchSignature {
  salePhase: SalePhase
}

export const useFetchSignature = () => {
  const log = useLogger(useFetchSignature.name)

  const { data: signer } = useSigner()

  const mutation = useMutation({
    mutationFn: async ({ salePhase }: IFetchSignature) => {
      if (!signer) {
        return undefined
      }
      const message = await AtlanteansAPI.fetchMessageToSign(salePhase)
      const messageSigned = await signer.signMessage(message) // waiting for user to sign msg in wallet
      const signature = await AtlanteansAPI.fetchSignature(salePhase, message, messageSigned)
      return signature
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
