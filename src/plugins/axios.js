import configAxios from 'axios';
import TokenService from "@/utils/token-service.js";

const axios = configAxios.create({
    baseURL: "https://theraponto.dev.thera.com.br:4433/api",
});

axios
    .interceptors
    .request
    .use(async config => {
            const token = TokenService.getToken()
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...config.headers
            }

            return config;
        },
        error => {
            Promise.reject(error)
        });

axios.interceptors.response.use(response => {
    return response;
}, error => {

    if (error.response.status === 401) {
        TokenService.removeToken()
        // window.location.reload()
    }
    return Promise.reject(error);
});

export default axios;