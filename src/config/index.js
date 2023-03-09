/*
 * Class
 */

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:  process.env.REACT_APP_STRAPI_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers = {
            Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;