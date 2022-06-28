import axios from 'axios'

const REACT_APP_API_URL = 'https://apitempo.inmet.gov.br/'

const api = axios.create({ baseURL: REACT_APP_API_URL })

export default api
