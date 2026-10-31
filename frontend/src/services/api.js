import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:5000/api',timeout:12000});
api.interceptors.request.use(config=>{const token=sessionStorage.getItem('vote_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use(response=>response,error=>{if(error.response?.status===401&&sessionStorage.getItem('vote_token')){sessionStorage.removeItem('vote_token');window.dispatchEvent(new Event('session-expired'));}return Promise.reject(error);});
export default api;
