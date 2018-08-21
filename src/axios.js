import axios from 'axios'
import store from './store'
import router from './router'

// 创建axios实例
var ajax = axios.create({
    timeout: 10000,         // 10s超时
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

// 请求拦截
ajax.interceptors.request.use(
    // 请求发送前
    config => {
        // 如果TOKEN存在，每个http header都加上TOKEN
        if (store.state.TOKEN) {
            config.headers.Authorization = `token ${store.state.TOKEN}`
        }
        return config;
    }
)

// 响应拦截
ajax.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {

            console.log("fullPath:", router.currentRoute.fullPath);
            
            switch (error.response.status) {
                case 401:
                    store.commit('LOGOUT')      // 清除token
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }   // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    })
            }
        }
        
        return Promise.reject(error.response)
    }
)

export default {
    // 用户登入
    userLogin(params) {
        return ajax.post('/api/login', params)
    },
    // 用户注册
    userRegister(params) {
        return ajax.post('/api/register', params)
    },
    // 获取用户信息
    getUserInfo() {
        return ajax.get('/api/getuserinfo')
    },
    // 删除用户
    delUser(params) {
        return ajax.post('/api/deluser', params)
    }

}