const { getDB } = require('../connection/MongoConnection')

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

exports.findAllUsers = async () => {
    try {
        return await users.find({}).toArray()
    } catch (error) {
        throw error
    }
}

