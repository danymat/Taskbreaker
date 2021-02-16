const { getDB } = require('../connection/MongoConnection')

const _db = getDB()
const users = _db.collection('users')

/**
 *
 * @param {import('../model/User').User} user
 */
exports.addUser = async (user) => {
    if (user == undefined) { throw Error('No User Created')}
    await users.insertOne(user)
    // console.log(users)
}

exports.findAllUsers = async () => {
    try {
        var allUsers = await users.find({})
        allUsers = await allUsers.toArray()
        console.log(allUsers)
    } catch (error) {
        throw error
    }
}

