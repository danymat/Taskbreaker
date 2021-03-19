const { getDB } = require('../connection/MongoConnection')
const _db = getDB()
const contexts = _db.collection('contexts')
const { Context } = require('../model/Context')


/**
 *
 * @param {import('../model/Context').Context} context
 */
exports.createContext = async (context) => {
    try {
        await contexts.insertOne(context)
    } catch (error) {
        throw error
    }
}

