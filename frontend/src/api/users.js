import { execute } from './_config.js'

/**
 *
 * @param {Object} data
 * @param {String} data.email
 * @param {String} data.password
 */
export async function logUser(data) {
    try {
        let test = await execute('POST', 'users/login', { data: data });
        return test;
    } catch (error) {
        console.log(error);
        return error.data;
    }
}