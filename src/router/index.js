import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// components
import hello from "@/components/hello"
import login from "@/components/login"
import test from "@/components/test"


Vue.use(Router)
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: hello,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/hello',
            name: 'hello',
            component: hello
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/test',
            name: 'test',
            component: test,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 获取token
    let token = store.state.TOKEN;
    
    console.log("To", to, token);
    
    if (to.meta.requiresAuth) {
        if (token) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }    // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
            })
        }
    } else {
        next();
    }
})

export default router