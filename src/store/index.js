import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const state = {
    TOKEN: window.sessionStorage.getItem('token'),
}

const mutations = {
    // 用户登入
    LOGIN:(state, params) => {
        state.TOKEN = params;
        window.sessionStorage.setItem('token', params);
    },
    // 用户登出
    LOGOUT:(state, params) => {
        state.TOKEN = null;
        window.sessionStorage.removeItem('token');
    },
}

const actions = {

}

export default new vuex.Store({
    state,
    mutations,
    actions
})