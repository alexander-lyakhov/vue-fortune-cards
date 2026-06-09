import axios from './AxiosInstance'
export { isLoading } from './AxiosInstance'

export async function getDecks() {
  try {
    const { data } = await axios.get('/decks')
    return {
      data,
      error: null
    }
  }
  catch(error) {
    return {
      data: null,
      error
    }
  }
}

export default {
  getDecks,
}