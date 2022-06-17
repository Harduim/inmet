import axios from 'axios'

const REACT_APP_API_URL = 'https://apitempo.inmet.gov.br/estacoes'

const api = axios.create({ baseURL: REACT_APP_API_URL })

export default api
