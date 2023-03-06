import { MerkleProof } from '@/types'
import axios, { AxiosInstance } from 'axios'
import { Bytes } from 'ethers'

interface IAtlanteansApiMessageToSign {
  message: string | Bytes
  digest: number
}

export class AtlanteansApi {
  public static baseURL?: string = process.env.NEXT_PUBLIC_ATLANTEANS_API_BASE_URL
  public static http: AxiosInstance = axios.create({
    baseURL: this.baseURL,
    headers: {
      Authorization: `Bearer ${null}`,
    },
  })

  /**
   * WL: paid mint for whitelisted
   */
  public static fetchWLMessageToSign = async () => {
    const { data } = await this.http.get<IAtlanteansApiMessageToSign>(
      '/atlanteans/merkle/signing-message/mintlist'
    )
    return data
  }

  public static fetchWLProof = async (digest: number, signature: string) => {
    const { data: proof } = await this.http.post<MerkleProof>(`/atlanteans/merkle/proof/mintlist`, {
      digest,
      signature,
    })
    return proof
  }

  /**
   * claim: FA free mint
   */
  public static fetchClaimMessageToSign = async () => {
    const { data } = await this.http.get<IAtlanteansApiMessageToSign>(
      '/atlanteans/merkle/signing-message/claimlist'
    )
    return data
  }

  public static fetchClaimProof = async (digest: number, signature: string) => {
    const { data: proof } = await this.http.post<MerkleProof>(
      `/atlanteans/merkle/proof/claimlist`,
      {
        digest,
        signature,
      }
    )
    return proof
  }
}
