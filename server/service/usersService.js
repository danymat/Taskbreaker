const { getDB } = require('../connection/MongoConnection')
const {createError} = require('../constants/Error')
const _db = getDB()
const users = _db.collection('users')

/**
 *
 * @param {import('../model/User').User} user
 */
exports.addUser = async (user) => {
    try {
        if (user == undefined) { throw Error('No User Created') }
        await users.insertOne(user)
    } catch (error) {
        throw error
    }
}

/**
 * @returns {import('../model/User').User[]}
 */
exports.findAllUsers = async () => {
    try {
        return await users.find({}).toArray()
    } catch (error) {
        throw error
    }
}

/**
 * @param {String} email
 * @returns {import('../model/User').User|null}
 */
exports.findUser = async (email) => {
    try {
        let query = { email : email }
        return await users.findOne(query)
    } catch (error) {
        throw error
    }
}



/**
 *
 * @param {import('../model/User').User} user
 */
exports.isUserAlreadyTaken = async (user) => {
    try {
        let query = { email: user.email }
        let userQuery = await users.findOne(query)
        let isTaken = userQuery != null
        if (isTaken) {
            throw new createError(403, 'User already taken')
        }
    } catch (error) {
        throw error
    }
}
