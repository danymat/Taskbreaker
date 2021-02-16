const bcrypt = require('bcrypt')
const saltRounds = 10

/**
 *
 * @param {String} password
 */
exports.encryptPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        throw error
    }
}

exports.verifyPassword = async (password, encrypted) => {
    try {
        if (!encrypted) {
            throw Error('Inexistent password in DB')
        }
        return await bcrypt.compare(password, encrypted)
    } catch (error) {
        throw error
    }
}