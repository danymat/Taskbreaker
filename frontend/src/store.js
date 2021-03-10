import { createStore } from 'vuex'

export default createStore({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        menu: false
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
        change_menu_state(state, value=null) {
            if (value == null) {
                state.menu = !state.menu;
            } else {
                state.menu = value;
            }
        }
    },
    actions: {
        login({ commit }, token) {
            commit('auth_success', token);
            localStorage.setItem('token', token);
        },
        register({ commit }, smthg) { },
        logout({ commit }) {
            commit('logout');
            localStorage.removeItem('token');
        },
        changeMenuState({ commit }, value = null) {
            commit('change_menu_state', value);
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isMenuHidden: state => !state.menu
    }
})