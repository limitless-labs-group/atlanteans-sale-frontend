import { SALE_PHASE } from '@/constants'
import { MerkleProof } from '@/types'
import axios, { AxiosInstance } from 'axios'
import { Bytes } from 'ethers'

interface IAtlanteansAPIMessageToSignResponse {
  message: string | Bytes
  digest: number
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
  public static fetchMessageToSign = async (salePhase: SALE_PHASE) => {
    const { data } = await this.http.get<IAtlanteansAPIMessageToSignResponse>(
      `/atlanteans/merkle/signing-message/${salePhase}`
    )
    return data
  }

  public static fetchProof = async (salePhase: SALE_PHASE, digest: number, signature: string) => {
    const {
      data: { proof },
    } = await this.http.post<IAtlanteansAPIMerkleProofResponse>(
      `/atlanteans/merkle/proof/${salePhase}`,
      {
        digest,
        signature,
      }
    )
    return proof
  }
}
