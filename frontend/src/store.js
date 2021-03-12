import { createStore } from 'vuex'

export default createStore({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        email: '',
        menu: false
    },
    mutations: {
        auth_success(state, data) {
            state.status = 'success'
            state.email = data.email
            state.token = data.token
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.email = ''
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
        login({ commit }, data) {
            commit('auth_success', data);
            localStorage.setItem('token', data.token);
        },
        register({ commit }, data) {
            commit('auth_success', data);
            localStorage.setItem('token', data.token);
        },
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
        isMenuHidden: state => !state.menu,
        email: state => state.email
    }
})