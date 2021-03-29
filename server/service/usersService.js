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
        if (user == undefined) { throw new createError('No user created') }
        await users.insertOne(user)
    } catch (error) {
        throw new createError(error.status, error.message)
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
                    uuid: u.uuid,
                    username: u.username,
                    email: u.email,
                    password: u.password,
                    created: u.created,
                    authorities: u.authorities
                })
            )
        })
        return returnedUsers
    } catch (error) {
        throw new createError(401, error)
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
            uuid: user.uuid,
            username: user.username,
            email: user.email,
            password: user.password,
            authorities: user.authorities
        })
    } catch (error) {
        throw new createError(401, error)
    }
}

/**
 * @param {uuid} user_uuid
 * @returns {import('../model/User').User|null}
 */
exports.getInfo = async (user_uuid) => {
    try {
        let query = { uuid: user_uuid }
        let user = await users.findOne(query)
        if (user == null) { return null }
        return {
            uuid: user.uuid,
            username: user.username,
            email: user.email,
            password: user.password,
            created: user.created,
            authorities: user.authorities
        }
    } catch (error) {
        throw new createError(401, error)
    }
}

/**
 * @param {uuid} user_uuid
 * @param {String} new_password encrypted password
 * 
 */
exports.changePasswordDb = async (user_uuid, new_password) => {
    try {
        let query = { uuid: user_uuid }
        let test = await users.findOne(query)
        console.log(test)
        await users.updateOne(query, { $set: { password: new_password } })
        test = await users.findOne(query)
        console.log(test)
    } catch (error) {
        throw new createError(401, error)
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
            throw new createError(401, 'User already taken')
        }
    } catch (error) {
        throw new createError(error.status, error.message)
    }
}
