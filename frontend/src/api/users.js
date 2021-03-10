import { execute } from './_config.js'
import store from './../store'

/**
 *
 * @param {Object} data
 * @param {String} data.email
 * @param {String} data.password
 */
export async function logUser(data) {
    try {
        const test = await execute('POST', 'users/login', { data: data })
        store.dispatch('login', test.token)
        console.log(test);
        return test;
    } catch (error) {
        console.log(error);
        return error.data;
    }
}

export async function registerUser(data) {
    try {
        const test = await execute('POST', 'users/sign-up', { data: data })
        store.dispatch('register', test.token)
        console.log(test);
        return test;
    } catch (error) {
        console.log(error);
        return error.data;
    }
}