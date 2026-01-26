import axios from 'axios';

// ⚠️ Mude de 8081 para 8080
const API_URL = 'http://192.168.0.107:8080'; 

const api = axios.create({
  baseURL: API_URL,
});

export default api;