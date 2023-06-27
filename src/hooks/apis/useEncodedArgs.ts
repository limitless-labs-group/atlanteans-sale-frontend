import { AtlanteansAPI } from '@/apis'
import { SalePhase } from '@/constants'
import { useLogger } from '@/hooks'
import { useMutation, useSigner } from 'wagmi'

interface IEncodedArgs {
  salePhase: SalePhase
}

export const useEncodedArgs = () => {
  const log = useLogger(useEncodedArgs.name)

  const { data: signer } = useSigner()

  const mutation = useMutation({
    mutationFn: async ({ salePhase }: IEncodedArgs) => {
      if (!signer) {
        return undefined
      }
      const message = await AtlanteansAPI.fetchMessageToSign(salePhase)
      const messageSigned = await signer.signMessage(message) // waiting for user to sign msg in wallet
      log.verbose(messageSigned)
      const encodedArgs = await AtlanteansAPI.fetchEncodedArgs(salePhase, message, messageSigned)
      return encodedArgs
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
