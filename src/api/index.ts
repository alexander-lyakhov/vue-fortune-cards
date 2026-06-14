import axios from './AxiosInstance'
export { isLoading } from './AxiosInstance'

export async function getDeckList() {
  return axios.get('/decks').then(
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

export async function getDeckById(id: number | string) {
  return axios.get(`decks/${id}`).then(
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
