import { instance } from './index'
export default {
    get(url, data) {
        return instance({
            method: "get",
            url: url,
            params: data
        })
    },
    post(url, data) {
        return instance({
            method: "post",
            url: url,
            data: data
        })
    },
    delete(url, data) {
        return instance({
            method: "delete",
            url: url,
            params: data
        })
    },
    put(url, data) {
        return instance({
            method: "put",
            url: url,
            data: data
        })
    }
}