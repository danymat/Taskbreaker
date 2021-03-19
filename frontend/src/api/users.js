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
        store.dispatch('login', { token: test.token, email: test.email })
        return test
    } catch (error) {
        console.log(error)
        return error.data
    }
}

export async function registerUser(data) {
    try {
        const test = await execute('POST', 'users/sign-up', { data: data })
        store.dispatch('register', { token: test.token, email: test.email })
        return test
    } catch (error) {
        console.log(error)
        return error.data
    }
}

export async function getUserTasks(data) {
    try {
        const test = await execute('GET', 'users/tasks', { data: data })
        return test
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function createUserTask(data) {
    try {
        const test = await execute('POST', 'users/task', { data: data })
        return test
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function deleteUserTask(uuid) {
    try {
        const test = await execute('POST', 'users/deletetask', { data: { uuid: uuid } })
        return test
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function completeUserTask(uuid) {
    try {
        const test = await execute('POST', 'users/completetask', { data: { uuid: uuid } })
        return test
    } catch (error) {
        console.log(error)
        return error
    }
}