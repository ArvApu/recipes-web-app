import axios from 'axios';
import sessionService from '../services/session.service.js'
import router from '@/router';
import { extractErrors } from '@/utils/helpers'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

/* ------------------------------- Request interceptors ------------------------------- */

/* Auth inteceptor */
const authInterceptor = (config) => {
  var token = sessionService.getAccessToken();

  if (token != null) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}

api.interceptors.request.use(
  authInterceptor,
  error => { Promise.reject(error) }
)

/* ------------------------------- Response interceptors ------------------------------- */

/* Interceptor for responses - error */
const errorInterceptor = (error) => {
  /* All the error responses */
  switch (error.response.status) {
    case 401: // authentication error, logout the user
      sessionService.clearTokens();
      router.push('/login');
      break;
    default:
      console.error(error.response.status, error.message);
      error = extractErrors(error.response.data);
  }
  return Promise.reject(error);
}

/* Interceptor for responses - success */
const responseInterceptor = (response) => {
  return response;
}

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;