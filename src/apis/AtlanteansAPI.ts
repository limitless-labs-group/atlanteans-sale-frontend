import { SalePhase } from '@/constants'
import { MerkleProof } from '@/types'
import axios, { AxiosInstance } from 'axios'

interface IFetchMessageToSignResponse {
  message: string
  value: string
}

interface IFetchEncodedArgsResponse {
  signature?: string
  message?: string
  scrollsAmount?: number
  error?: string
}

interface IFetchMerkleProofResponse {
  proof: MerkleProof
}

export class AtlanteansAPI {
  static baseURL?: string = `${process.env.NEXT_PUBLIC_SERVERLESS_API_BASE_URL}/atlanteans`
  static http: AxiosInstance = axios.create({
    baseURL: this.baseURL,
    // headers: {
    //   Authorization: `Bearer ${null}`,
    // },
  })

  static fetchMessageToSign = async (salePhase: SalePhase) => {
    const {
      data: { message },
    } = await this.http.get<IFetchMessageToSignResponse>(`/merkle/signing-message/${salePhase}`)
    return message
  }

  static fetchProof = async (salePhase: SalePhase, message: string, messageSigned: string) => {
    const {
      data: { proof },
    } = await this.http.post<IFetchMerkleProofResponse>(`/merkle/proof/${salePhase}`, {
      digest: message,
      signature: messageSigned,
    })
    return proof
  }

  static fetchEncodedArgs = async (
    salePhase: SalePhase,
    message: string,
    messageSigned: string,
    quantity?: number
  ) => {
    const response = await this.http.post<IFetchEncodedArgsResponse>(`/encoded-args/${salePhase}`, {
      digest: message,
      signature: messageSigned,
      quantity,
    })

    return response.data
  }
}
