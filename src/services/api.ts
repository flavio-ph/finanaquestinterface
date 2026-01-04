import axios from 'axios';

// O endereço exato do seu PC na rede local
const API_URL = 'http://192.168.3.88:8080';

const api = axios.create({
  baseURL: API_URL,
});

export default api;