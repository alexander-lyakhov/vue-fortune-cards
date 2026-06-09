import axios from './AxiosInstance'
export { isLoading } from './AxiosInstance'

export async function getDecks() {
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

export default {
  getDecks,
}
