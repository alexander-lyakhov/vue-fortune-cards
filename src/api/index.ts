import axios             from './AxiosInstance'
import type { Response } from '@/types'
export { isLoading } from './AxiosInstance'

export async function getDeckList<T>(): Promise<Response<T>> {
  return axios.get<T>('/decks').then(
    ({ data }) => ({
       data,
       error: null,
    }),
    (error) => ({
      data: null,
      error
    })
  )
}

export async function getDeckById<T>(id: number | string): Promise<Response<T>> {
  return axios.get<T>(`decks/${id}`).then(
    ({ data }) => ({
       data,
       error: null,
    }),
    (error) => ({
      data:
      null, error
    })
  )
}

export default {
  getDeckList,
  getDeckById,
}
