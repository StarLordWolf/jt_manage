// 引入和配置axios 
import axios from 'axios';
import { Message } from "element-ui"
let instance = axios.create({
    timeout: 10000
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code != 0) {
        Message.error(response.data.msg);
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    Message.error("服务器错误");
    return Promise.reject(error);
});

export { instance }