import Axios from 'axios';


const api = Axios.create({ baseURL: 'http://localhost:8000/api' })

export default api;