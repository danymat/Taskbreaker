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
        throw error.data
    }
}

export async function registerUser(data) {
    try {
        const test = await execute('POST', 'users/sign-up', { data: data })
        store.dispatch('register', { token: test.token, email: test.email })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function postChangePassword(data) {
    try {
        const test = await execute('POST', 'users/changepassword', { data: data })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function getUserData() {
    try {
        const test = await execute('GET', 'users/account')
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function getUserTasks(data) {
    try {
        const test = await execute('GET', 'users/tasks', { data: data })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function createUserTask(data) {
    try {
        const test = await execute('POST', 'users/task', { data: data })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function deleteUserTask(uuid) {
    try {
        const test = await execute('POST', 'users/deletetask', { data: { uuid: uuid } })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function completeUserTask(uuid) {
    try {
        const test = await execute('POST', 'users/completetask', { data: { uuid: uuid } })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function addContext(context) {
    try {
        const test = await execute('POST', 'users/context', { data: { context: context } })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}

export async function addProject(project) {
    try {
        const test = await execute('POST', 'users/project', { data: { project: project } })
        return test
    } catch (error) {
        console.log(error)
        throw error.data
    }
}