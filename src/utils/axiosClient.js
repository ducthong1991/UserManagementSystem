import axios from 'axios';

const baseURL = 'https://reqres.in/api/';

const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error.response);
});

export default axiosClient;
