import axios from 'axios';
import { apiUrl } from './environment';


const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 180000,
    headers: {
        'Accept': 'text/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
});

axiosInstance.defaults.headers.common['Authorization'] = '';

axiosInstance.interceptors.request.use(function (config) {

    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    if (accessToken)
        config.headers.Authorization = accessToken ? `bearer ${accessToken}` : '';

    return config;

}, function (error) {
    return Promise.reject(error);

});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {

    return response;
},
    async function (error) {

        if (error) {
            return error
        }

        return Promise.reject(error);
    });

export { axiosInstance as tmdbAxios };



