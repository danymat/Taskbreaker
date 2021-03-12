const { getDB } = require('../connection/MongoConnection')
const {createError} = require('../constants/Error')
const { User } = require('../model/User')
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
        let userList = await users.find({}, { _id: 0 }).toArray()
        if (userList == null) { return null }
        var returnedUsers = []
        userList.forEach((u) => {
            returnedUsers.push(
                new User({
                    username: u.username,
                    email: u.email,
                    password: u.password,
                    created: u.created,
                    authorities: u.authorities
                })
            )
        })
        console.log(returnedUsers)
        return returnedUsers
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
        let user = await users.findOne(query)
        if (user == null) { return null }
        return new User({
            username: user.username,
            email: user.email,
            password: user.password,
            authorities: user.authorities
        })
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
