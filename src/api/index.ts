import axios from './AxiosInstance'

export function getDecks() {
	return axios.get('https://fortunecards-b2gmfjgkg4dteag4.westeurope-01.azurewebsites.net/api/decks')
}

export default {
	getDecks,
}