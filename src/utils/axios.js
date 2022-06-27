import axios from "axios";
import { API_HOST } from "../config/common";

// 创建axios实例
const service = axios.create({
    baseURL: API_HOST, // api的base_url
    timeout: 10000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        return config;
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;
