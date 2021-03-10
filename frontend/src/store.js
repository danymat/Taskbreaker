import { createStore } from 'vuex'

export default createStore({
    state: {
        status: '',
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({ commit }, token) {
            commit('auth_success', token)
            localStorage.setItem('token', token)
        },
        register({ commit }, smthg) { },
        logout({ commit }) {
            commit('logout')
            localStorage.removeItem('token')
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})