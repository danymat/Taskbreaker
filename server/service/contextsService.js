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

/**
 *
 * @param {import('../model/User').User} user
 */
 exports.findAllUserContexts = async (user) => {
    try {
        const query = { userUuid: user.uuid }
        let userContexts = await contexts.find(query, { _id: 0 }).toArray()
        var returnedContexts = []
        for (let index = 0; index < userContexts.length; index++) {
            const c = userContexts[index];
            let context = new Context({
                uuid: c.uuid,
                userUuid: c.userUuid,
                title: c.title
            })
            returnedContexts.push(context)
        }
        return returnedContexts
    } catch (error) {
        throw new createError(401, error)
    }
}


