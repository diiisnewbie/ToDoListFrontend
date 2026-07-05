import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

//https://java-application-1pv9.onrender.com

// Backend luôn bọc trong { code, message, result } => unwrap sẵn ở đây
axiosClient.interceptors.response.use(
  (response) => response.data.result,
  (error) => {
    const apiError = error.response?.data;
    return Promise.reject(apiError || error);
  }
);

export default axiosClient;