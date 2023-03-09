import { SalePhase } from '@/constants'
import { MerkleProof } from '@/types'
import axios, { AxiosInstance } from 'axios'

interface IAtlanteansAPIMessageToSignResponse {
  message: string
  value: string
}

interface IAtlanteansAPIMerkleProofResponse {
  proof: MerkleProof
}

export class AtlanteansAPI {
  public static baseURL?: string = process.env.NEXT_PUBLIC_ATLANTEANS_API_BASE_URL
  public static http: AxiosInstance = axios.create({
    baseURL: this.baseURL,
    // headers: {
    //   Authorization: `Bearer ${null}`,
    // },
  })

  /**
   * WL & CLAIM logic: sign message and fetch proof
   */
  public static fetchMessageToSign = async (salePhase: SalePhase) => {
    const {
      data: { message },
    } = await this.http.get<IAtlanteansAPIMessageToSignResponse>(
      `/atlanteans/merkle/signing-message/${salePhase}`
    )
    return message
  }

  public static fetchProof = async (salePhase: SalePhase, message: string, signature: string) => {
    const {
      data: { proof },
    } = await this.http.post<IAtlanteansAPIMerkleProofResponse>(
      `/atlanteans/merkle/proof/${salePhase}`,
      {
        digest: message,
        signature,
      }
    )
    return proof
  }
}
